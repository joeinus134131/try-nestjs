import { Module } from '@nestjs/common';
import { UsersController } from './users.controller'
import { UsersService } from './users.service';
import { DecryptService } from 'src/lib/decrypt/decrypt.service';
import { EncryptService } from 'src/lib/encrypt/encrypt.service';
import { PrismaService } from 'src/lib/prisma/prisma.service';
@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    PrismaService, 
    EncryptService, 
    DecryptService],
})
export class UsersModule {}
