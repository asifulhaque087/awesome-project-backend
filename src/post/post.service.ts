import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post, PostDocument } from './entities/post.entity';
import { Model } from 'mongoose';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name)
    private readonly PostModel: Model<PostDocument>,
  ) {}

  async create(createPostDto: CreatePostDto) {
    createPostDto['createdAt'] = new Date();
    let newPost = new this.PostModel(createPostDto);
    newPost = await newPost.save();
    return newPost;
  }

  async findAll(queryParam) {
    try {
      let query = this.PostModel.find();

      const page = parseInt(queryParam.page) || 1;
      const pageSize = parseInt(queryParam.limit) || 4;
      const skip = (page - 1) * pageSize;
      const total = await this.PostModel.countDocuments();

      const pages = Math.ceil(total / pageSize);

      query = query.skip(skip).limit(pageSize);

      if (page > pages) {
        throw new NotFoundException('Page not found');
      }

      const result = await query;

      return {
        status: 'success',
        count: result.length,
        page,
        pages,
        data: result,
      };
    } catch (error) {
      console.log(error);
    }
    // return this.PostModel.find();
    return `This action returns all post`;
  }

  findOne(id: string) {
    console.log('id is ', id);
    return this.PostModel.findById(id);
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
