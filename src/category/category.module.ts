import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema, categoryModal } from './schema/category.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: CategorySchema.name, schema: categoryModal },
        ]),
    ],
    controllers: [CategoryController],
    providers: [CategoryService],
})
export class CategoryModule {}
