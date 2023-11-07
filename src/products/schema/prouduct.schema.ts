import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { CategorySchema } from 'src/category/schema/category.schema';
import * as mongoose from 'mongoose';

export type ProductDocument = HydratedDocument<ProductSchema>;

@Schema({ collection: 'products', timestamps: true })
export class ProductSchema {
    @Prop({ type: String, required: true })
    name: string;

    @Prop({ type: String, required: true })
    description: string;

    @Prop({ type: Number, required: true })
    price: number;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: CategorySchema.name })
    category: CategorySchema;

    @Prop({ type: Number, required: true })
    stock: number;
}

export const ProductModal = SchemaFactory.createForClass(ProductSchema);
