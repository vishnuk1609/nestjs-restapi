import {
    Controller,
    Get,
    Post,
    Put,
    Req,
    Res,
    Body,
    Param,
    Delete,
    UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Request, Response } from 'express';
import { EditCategoryDto } from './dto/update-category.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('category')
@UseGuards(AuthGuard)
export class CategoryController {
    constructor(private categoryService: CategoryService) {}

    @Get()
    async getAllCategory(@Req() req: Request, @Res() res: Response) {
        const categoryData = await this.categoryService.getAllCategory();
        res.status(200).json({
            status: true,
            statusCode: 200,
            message: 'All category',
            data: categoryData,
        });
    }

    @Post('create')
    async createCategory(
        @Body() categoryData: CreateCategoryDto,
        @Req() req: Request,
        @Res() res: Response,
    ) {
        const category =
            await this.categoryService.createCategory(categoryData);
        res.status(201).json({
            status: true,
            statusCode: 201,
            message: 'Category created successfully',
            data: [category],
        });
    }

    @Put('edit/:id')
    async editCategory(
        @Param('id') id: string,
        @Body() cateData: EditCategoryDto,
        @Req() req: Request,
        @Res() res: Response,
    ) {
        const editedCategory = await this.categoryService.editCategory(
            id,
            cateData,
        );
        res.status(200).json({
            status: true,
            statusCode: 200,
            message: 'Category edited successfully',
            data: [{ category: editedCategory }],
        });
    }

    @Delete('delete/:id')
    async deleteCategory(
        @Param('id') id: string,
        @Req() req: Request,
        @Res() res: Response,
    ) {
        await this.categoryService.deleteCategory(id);
        res.status(200).json({
            status: true,
            statusCode: 200,
            message: 'Successfully delete the category',
            data: [],
        });
    }
}
