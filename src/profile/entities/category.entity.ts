import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema({ collection: 'categories', timestamps: true })
export class Category {
  // In MongoDB, _id is automatically generated, no need for PrimaryGeneratedColumn
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true, unique: true })
  slug: string;

  // self-reference for subcategories
  @Prop({ type: Types.ObjectId, ref: 'Category', default: null })
  parentId?: Types.ObjectId;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
 