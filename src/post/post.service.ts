import { Injectable, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostDocument } from './entities/post.entity';
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

  findAll() {
    return this.PostModel.find();
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
