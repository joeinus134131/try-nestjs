import { Injectable } from '@nestjs/common';
import { PrismaService } from '../lib/prisma/prisma.service';
import { CreatedUsersDto } from './dto/crud_users.dto';
import { EncryptService } from '../lib/encrypt/encrypt.service';
import { DecryptService } from '../lib/decrypt/decrypt.service';

export type users = any;

@Injectable()
export class UsersService {
    env: string;
    constructor(
      private readonly prismaService: PrismaService,
      private encryptService: EncryptService,
      private decryptService: DecryptService
    ){
      this.env = process.env.PRODUCTION;
    }
    
    async findOne(id: number){
      // return this.prismaService.users.findUnique({ where: { id: id } });
      const user_data = await this.prismaService.$queryRaw`SELECT
          a.id,
          a.username,
          a.email,
          a.fullname,
          a.phone,
          a.created_at,
          b.bdate,
          b.gender,
          b.photos,
          b.education,
          b.address,
          b.notes
      FROM
          users AS a
          INNER JOIN persons AS b ON a.id_persons = b.id
      WHERE a.id = ${id}`;
      const data = user_data[0];
      return data;
    }

    async countUsers(){
      const result =  (await this.prismaService.users.count()) as unknown as number;
      if(!result){
        return null;
      }
      else{
        return Number((Math.round(((Number)(result)/1)*1e2))/1e2);
      }
    }

    async createUserMaster(dto: CreatedUsersDto) {
      let hashedPassword = await this.encryptService.bcrypt_hash(dto.password);
      const check = await this.prismaService.$queryRaw`SELECT id FROM users WHERE email = ${dto.email}`;
      const email_check = check[0];

      let response = {};

      if (email_check) {
          response = {
              status: "failed",
              message: "Username sudah terdaftar, harap periksa kembali data anda."
          };
      } else { 
          try {
              await this.prismaService.$queryRaw`INSERT INTO persons(bdate, gender, photos, education, address, notes) VALUES(${dto.bdate}, ${dto.gender}, ${dto.photos}, ${dto.education}, ${dto.address}, ${dto.notes})`;
              
              const persons = await this.prismaService.$queryRaw`SELECT id FROM persons WHERE id IN (SELECT MAX(id) FROM persons)`;
              const person_id = persons[0].id;

              await this.prismaService.$queryRaw`INSERT INTO users(id_persons, username, email, password, fullname, phone) VALUES(${person_id}, ${dto.username}, ${dto.email}, ${hashedPassword}, ${dto.fullname}, ${dto.phone})`;

              response = {
                status: 'success',
                message: 'Data inserted',
              };
          } catch(error){
              response = {
                status: "failed",
                message: (this.env == "TRUE") ? "Failed to insert data" : error.message
              };
          }
      }

      return response;
  }
}
