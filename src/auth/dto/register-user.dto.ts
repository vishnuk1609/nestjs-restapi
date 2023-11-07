import {
    IsNotEmpty,
    IsString,
    MinLength,
    MaxLength,
    IsEmail,
} from 'class-validator';
import { Roles } from '../enum/role.enum';

export class RegisterUserDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(15)
    userName: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(15)
    password: string;

    @IsNotEmpty()
    @IsString()
    role: Roles;
}
