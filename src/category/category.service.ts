import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CategorySchema, categoryDocument } from './schema/category.schema';
import { Model } from 'mongoose';
import { IEditCategory, Icategory } from './interface/category.interface';

@Injectable()
export class CategoryService {
    constructor(
        @InjectModel(CategorySchema.name)
        private categoryModal: Model<CategorySchema>,
    ) {}

    async createCategory(categoryData: Icategory): Promise<categoryDocument> {
        const { name } = categoryData;
        // regular expression for checking the category already exist or not
        const existingCategory = await this.categoryModal.findOne({
            name: { $regex: new RegExp(`^${name}$`, 'i') },
        });
        if (existingCategory) {
            throw new ConflictException('The category already exist');
        }
        const newCategory = await this.categoryModal.create(categoryData);
        return newCategory;
    }

    async getAllCategory(): Promise<categoryDocument[]> {
        return await this.categoryModal.find();
    }

    async editCategory(
        categoryId: string,
        categoryData: IEditCategory,
    ): Promise<categoryDocument> {
        const { name } = categoryData;
        const existingCategory = await this.categoryModal.findOne({
            _id: { $ne: categoryId },
            name: { $regex: new RegExp(`^${name}$`, 'i') },
        });
        
        if (existingCategory) {
            throw new ConflictException('Same category name already exist');
        }
        const updatedCategory = await this.categoryModal.findByIdAndUpdate(
            categoryId,
            categoryData,
            { new: true },
        );
        return updatedCategory;
    }

    async deleteCategory(categoryId: string): Promise<void> {
        await this.categoryModal.findByIdAndDelete(categoryId);
    }
}
