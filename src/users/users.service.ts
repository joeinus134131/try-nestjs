import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/lib/prisma/prisma.service';
import { CreatedUsersDto } from './dto/crud_users.dto';
import { EncryptService } from 'src/lib/encrypt/encrypt.service';
import { DecryptService } from 'src/lib/decrypt/decrypt.service'

export type user = any;

@Injectable()
export class UsersService {
    constructor(
      private readonly prismaService: PrismaService,
      private encryptService: EncryptService,
      private decryptService: DecryptService
    ){}
    
    async findOne(email: string): Promise<user | undefined> {
      return this.prismaService.user.findUnique({ where: { email } });
    }

    async createUserMaster(dto: CreatedUsersDto) {
      let hashedPassword = await this.encryptService.bcrypt_hash(dto.password);
      const check = await this.prismaService.$queryRaw`SELECT id FROM user WHERE email = fn_aes_encrypt(${dto.email},${process.env.SECRET_AES})`;
      const email_check = check[0];

      let response = {};

      if (email_check) {
          response = {
              status: "failed",
              message: "Username sudah terdaftar, harap periksa kembali data anda."
          };
      } else { 
          try {
              await this.prismaService.$queryRaw`INSERT INTO user(email, password) VALUES( fn_aes_encrypt(${dto.email},${process.env.SECRET_AES}), ${hashedPassword})`;

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
