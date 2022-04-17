import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import * as mongoose from 'mongoose';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  content: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' })
  parentId: Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Post' })
  post: Types.ObjectId;

  @Prop()
  createdAt: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
