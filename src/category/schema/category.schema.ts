import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type categoryDocument = HydratedDocument<CategorySchema>;

@Schema({ collection: 'category', timestamps: true })
export class CategorySchema {
    @Prop({ type: String, required: true })
    name: string;

    @Prop({ type: String, required: true })
    description: string;
}

export const categoryModal = SchemaFactory.createForClass(CategorySchema);
