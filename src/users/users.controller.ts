import { Controller, Param, Get, UseGuards, Res, Body, Post, HttpStatus, Request, Delete, UseInterceptors, UploadedFile, Query } from "@nestjs/common";
import { UsersService } from "./users.service";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiHeader, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CreatedUsersDto } from './dto/crud_users.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ) { }
    @ApiTags('users')
    @Get('/detail')
    async findAll(username) {
        const result = await this.usersService.findOne(username);
        return {
            statusCode: HttpStatus.OK,
            result
        }
    }

    @ApiTags('users')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post('/create')
    async createUserMaster(@Body() dto: CreatedUsersDto){
        const result = await this.usersService.createUserMaster(dto);
        return {
            statusCode: HttpStatus.OK,
            result
        };
    }
}