import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment, CommentDocument } from './entities/comment.entity';
import { Model } from 'mongoose';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name)
    private readonly CommentModel: Model<CommentDocument>,
  ) {}

  async create(createCommentDto: CreateCommentDto) {
    createCommentDto['createdAt'] = new Date();
    if (!createCommentDto['parentId']) {
      createCommentDto['parentId'] = null;
    }
    let newComment = new this.CommentModel(createCommentDto);
    newComment = await newComment.save();
    return newComment;
  }

  findAll() {
    return `This action returns all comment`;
  }

  findAllByPostId(postId: string) {
    return this.CommentModel.find({ postId });
    // return [];
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
