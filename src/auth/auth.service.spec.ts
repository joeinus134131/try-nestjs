import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../lib/prisma/prisma.service';
import { DecryptService } from '../lib/decrypt/decrypt.service';
import { EncryptService } from '../lib/encrypt/encrypt.service';
import { PrismaModule } from '../lib/prisma/prisma.module';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [AuthService, PrismaService, UsersService, DecryptService, EncryptService, JwtService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
