import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
// import { DefaultAdminModule } from 'nestjs-admin';
import { PrismaModule } from './lib/prisma/prisma.module';
import { EncryptService } from './lib/encrypt/encrypt.service';
import { DecryptService } from './lib/decrypt/decrypt.service';


@Module({
  imports: [PrismaModule, AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService, EncryptService, DecryptService],
})
export class AppModule {}
