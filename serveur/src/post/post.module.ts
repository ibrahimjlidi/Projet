import { PostEntity } from './models/post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PostController } from './controller/post.controller';
import { PostService } from './service/post.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostEntity])
  ],
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule {}
