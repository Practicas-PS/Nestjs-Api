import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentService } from './coment.service';
import { CommentResolver } from './coment.resolver';
import { Comment } from './coment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment])],
  providers: [CommentService, CommentResolver],
})
export class CommentModule {}
