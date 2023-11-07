import {
    Controller,
    Req,
    Res,
    Body,
    Param,
    Get,
    Put,
    Post,
    Delete,
    UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Request, Response } from 'express';
import { AddProductDto } from './dto/add-product.dto';
import { EditProductDto } from './dto/edit-product.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { HasRole } from 'src/auth/decorator/roles.decorator';
import { Roles } from 'src/auth/enum/role.enum';
import { RolesGuard } from 'src/auth/role.guard';

@Controller('products')
@UseGuards(AuthGuard, RolesGuard)
export class ProductsController {
    constructor(private productService: ProductsService) {}

    @Get()
    async getAllProduct(@Req() req, @Res() res: Response) {
        console.log(req.user);
        const products = await this.productService.getAllProduct();
        res.status(200).json({
            status: true,
            statusCode: 200,
            message: 'All Products',
            data: products,
        });
    }

    @HasRole(Roles.ADMIN)
    @Post('add')
    async addProduct(
        @Body() productData: AddProductDto,
        @Req() req: Request,
        @Res() res: Response,
    ) {
        const newProduct = await this.productService.addProduct(productData);
        res.status(201).json({
            status: true,
            statusCode: 201,
            message: 'New product add successfully',
            data: [newProduct],
        });
    }

    @HasRole(Roles.ADMIN)
    @Put('edit/:id')
    async editProduct(
        @Param('id') id: string,
        @Body() prodData: EditProductDto,
        @Req() req: Request,
        @Res() res: Response,
    ) {
        const updatedProduct = await this.productService.editProduct(
            id,
            prodData,
        );
        res.status(200).json({
            status: true,
            statusCode: 200,
            message: 'Successfully delete product',
            data: [updatedProduct],
        });
    }

    @HasRole(Roles.ADMIN)
    @Delete('delete/:id')
    async deleteProudct(
        @Param('id') id: string,
        @Req() req: Request,
        @Res() res: Response,
    ) {
        await this.productService.deleteProduct(id);
        res.status(200).json({
            status: false,
            statusCode: 200,
            message: 'Successfully delete the product',
            data: [],
        });
    }
}
