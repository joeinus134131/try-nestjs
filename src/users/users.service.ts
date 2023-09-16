import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/lib/prisma/prisma.service';
import { CreatedUsersDto } from './dto/crud_users.dto';
import { EncryptService } from 'src/lib/encrypt/encrypt.service';
import { DecryptService } from 'src/lib/decrypt/decrypt.service'

export type users = any;

@Injectable()
export class UsersService {
    constructor(
      private readonly prismaService: PrismaService,
      private encryptService: EncryptService,
      private decryptService: DecryptService
    ){}
    
    async findOne(id: number){
      return this.prismaService.users.findUnique({ where: { id: id } });
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
              await this.prismaService.$queryRaw`INSERT INTO users(username, email, password, fullname, phone) VALUES(${dto.username}, ${dto.email}, ${hashedPassword}, ${dto.fullname}, ${dto.phone})`;

              response = {
                status: 'success',
                message: 'Data inserted',
              };
          } catch(error){
              response = {
                status: "failed",
                message: "Failed to insert data"
              };
          }
      }

      return response;
  }
}
