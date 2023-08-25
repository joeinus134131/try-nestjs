import { Controller, Request, UseGuards, Post, Body, HttpCode, Get } from '@nestjs/common';
import { ApiBody, ApiHeader, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';


@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post(`/login`)
    async login(@Body() dto: LoginDto) {        
        return this.authService.login(dto);
    }

    
    @HttpCode(200)
    @ApiHeader({
        name: 'API_KEY',
        description: 'Enter API KEY: a4c04bcbacf15ede3b41c6e5435aacff6c6126675b4525b5a30e421f0d157784',
    })
    
    @UseGuards(JwtAuthGuard)
    @Get('/logout')
    logout(@Request() req) {       
        const jwt = req.headers.authorization.replace('Bearer ', '');         
        return this.authService.logout(req.user['userId'], jwt);
    }
}
