import {
    IsString,
    IsNotEmpty,
    IsEmail,
    MinLength,
    MaxLength,
} from 'class-validator';


export class LoginUserDto {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(15)
    password: string
}