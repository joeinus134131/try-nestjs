import { Controller, Param, Get, UseGuards, Res, Body, Post, HttpStatus, Request, Delete, UseInterceptors, UploadedFile, Query } from "@nestjs/common";
import { UsersService } from "./users.service";
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CreatedUsersDto } from './dto/crud_users.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ) { }
    @ApiTags('users')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('/detail')
    async findAll(@Request() req) {
        console.log(req.user.userId)
        const result = await this.usersService.findOne(req.user.userId);
        return {
            statusCode: HttpStatus.OK,
            result
        }
    }

    @ApiTags('users')
    @Post('/create')
    async createUserMaster(@Body() dto: CreatedUsersDto){
        const result = await this.usersService.createUserMaster(dto);
        return {
            statusCode: HttpStatus.OK,
            result
        };
    }

    @ApiTags('users')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('/count')
    async countUserMaster(){
        const result = await this.usersService.countUsers();
        return {
            statusCode: HttpStatus.OK,
        };
    }
}
