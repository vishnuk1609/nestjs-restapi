import {
    IsString,
    IsNotEmpty,
    MinLength,
    MaxLength,
    Max,
} from 'class-validator';

export class CreateCategoryDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    name: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(10)
    @MaxLength(50)
    description: string;
}
