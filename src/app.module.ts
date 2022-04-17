import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    PostModule,
    CommentModule,
  ],
  // imports: [],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
