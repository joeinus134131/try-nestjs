import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersController } from './users.controller'
import { UsersService } from './users.service';
import { DecryptService } from 'src/lib/decrypt/decrypt.service';
import { AuthService } from '../auth/auth.service';
import { EncryptService } from 'src/lib/encrypt/encrypt.service';
import { jwtConstants } from 'src/auth/constants';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { PrismaService } from 'src/lib/prisma/prisma.service';
@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: jwtConstants.expiredIn
       },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, AuthService, JwtStrategy, PrismaService, EncryptService, DecryptService],
})
export class UsersModule {}
