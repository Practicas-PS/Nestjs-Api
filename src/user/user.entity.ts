import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Post } from '../post/post.entity';
import { Comment } from '../coment/coment.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column() 
  @Field()
  profilePic: string;

  @Column()
  @Field()
  username: string;

  @Column({ unique: true })
  @Field()
  email: string;

  @Column()
  @Field()
  password: string;

  @OneToMany(() => Post, post => post.user)
  @Field(() => [Post])
  posts: Post[];

  @OneToMany(() => Comment, comment => comment.user)
  @Field(() => [Comment])
  comments: Comment[];
}
