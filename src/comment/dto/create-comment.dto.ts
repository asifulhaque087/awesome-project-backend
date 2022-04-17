import { IsOptional, IsString } from 'class-validator';
export class CreateCommentDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  postId: string;

  @IsOptional()
  @IsString()
  parenId: string;
}
