import { Controller, Post, Body, Req, Res, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { Request, Response } from 'express';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Get()
    async getAllUsers(@Req() req: Request, @Res() res: Response) {
        const users = await this.authService.getAllUsers();
        res.status(200).json({
            status: true,
            statusCode: 200,
            message: 'All users',
            data: users,
        });
    }

    @Post('signup')
    async signup(
        @Body() userData: RegisterUserDto,
        @Req() req: Request,
        @Res() res: Response,
    ) {
        await this.authService.signup(userData);
        res.status(201).json({
            status: true,
            statusCode: 201,
            message: 'New user created successfully',
            data: [],
        });
    }

    @Post('signin')
    async signin(
        @Body() userData: LoginUserDto,
        @Req() req: Request,
        @Res() res: Response,
    ) {
        const { token, user } = await this.authService.signin(userData);
        res.status(200).json({
            status: true,
            statusCode: 200,
            message: 'Successfully logedin',
            data: [
                {
                    token,
                    user,
                },
            ],
        });
    }
}
