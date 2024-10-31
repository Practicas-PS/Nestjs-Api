import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { Post } from '../post/post.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Comment {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column()
  @Field()
  content: string;

  @Column()
  @Field()
  rate: number;

  @Column()
  @Field()
  date: Date;

  @ManyToOne(() => User, user => user.comments)
  @Field(() => User)
  user: User;

  @ManyToOne(() => Post, post => post.comments)
  @Field(() => Post)
  post: Post;
}
