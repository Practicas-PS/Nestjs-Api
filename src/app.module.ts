import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './coment/coment.module';
import { User } from './user/user.entity';
import { Post } from './post/post.entity';
import { Comment } from './coment/coment.entity';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gpl'),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'ls-ea7ef303e426b22d0841d0e2ad8315f3522fd3b8.ct8s4gu8yu1q.us-east-2.rds.amazonaws.com',
      port: 5432,
      username: 'dbmasteruser',
      password: 'marco123',
      database: 'Marco',
      entities: [User, Post, Comment],
      synchronize: true,
    }),
    UserModule,
    PostModule,
    CommentModule,
  ],
})
export class AppModule {}
