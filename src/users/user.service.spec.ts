import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../lib/prisma/prisma.service';
import { EncryptService } from '../lib/encrypt/encrypt.service';
import { DecryptService } from '../lib/decrypt/decrypt.service';
import { PrismaModule } from '../../src/lib/prisma/prisma.module';

describe('UsersService', () => {
    let userService: UsersService;

    beforeEach(async() => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [PrismaModule],
            providers: [UsersService, PrismaService, UsersService, DecryptService, EncryptService, JwtService],
        }).compile();

        userService = module.get<UsersService>(UsersService);
    })

    it('should be defined', () => {
        expect(UsersService).toBeDefined();
    })
})

