import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProductDocument, ProductSchema } from './schema/prouduct.schema';
import { Model } from 'mongoose';
import { IAddProduct, IEditProduct } from './interface/products.interface';
import { AddProductDto } from './dto/add-product.dto';

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(ProductSchema.name)
        private productModel: Model<ProductSchema>,
    ) {}

    async getAllProduct(): Promise<ProductDocument[]> {
        return await this.productModel.find().populate('category');
    }

    async addProduct(productData: AddProductDto): Promise<ProductDocument> {
        const newProduct = await this.productModel.create(productData);
        await newProduct.populate('category');
        return newProduct;
    }

    async editProduct(
        proudctId: string,
        productData: IEditProduct,
    ): Promise<ProductDocument> {
        const updatedProduct = await this.productModel.findByIdAndUpdate(
            proudctId,
            productData,
            { new: true },
        );
        return updatedProduct;
    }

    async deleteProduct(productId: string): Promise<void> {
        await this.productModel.findByIdAndDelete(productId);
    }
}
