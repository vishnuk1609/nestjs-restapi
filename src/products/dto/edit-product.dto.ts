import {
    IsNotEmpty,
    IsString,
    MinLength,
    MaxLength,
    IsNumber,
    IsOptional,
} from 'class-validator';

export class EditProductDto {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(50)
    name: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(500)
    description: string;

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    category: string;

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    stock: number;
}
