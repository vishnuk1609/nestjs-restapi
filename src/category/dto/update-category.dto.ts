import {
    IsString,
    IsNotEmpty,
    MinLength,
    MaxLength,
    IsOptional,
} from 'class-validator';

export class EditCategoryDto {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    name: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @MinLength(10)
    @MaxLength(50)
    description: string;
}
