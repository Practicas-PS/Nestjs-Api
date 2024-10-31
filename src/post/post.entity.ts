import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../user/user.entity';
import { Comment } from '../coment/coment.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Post {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column()
  @Field()
  title: string;

  @Column()
  @Field()
  content: string;

  @ManyToOne(() => User, user => user.posts)
  @Field(() => User)
  user: User;

  @OneToMany(() => Comment, comment => comment.post)
  @Field(() => [Comment])
  comments: Comment[];
}
