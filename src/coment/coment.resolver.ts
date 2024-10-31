import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CommentService } from './coment.service';
import { Comment } from './coment.entity';

@Resolver(() => Comment)
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @Query(() => [Comment])
  findAllComments() {
    return this.commentService.findAll();
  }

  @Query(() => Comment)
  findCommentById(@Args('id', { type: () => Int }) id: number) {
    return this.commentService.findOne(id);
  }

  @Query(() => [Comment])
  findCommentsByPostId(@Args('postId', { type: () => Int }) postId: number) {
    return this.commentService.findByPostId(postId);
  }


  @Mutation(() => Comment)
  createComment(
    @Args('content') content: string,
    @Args('rate') rate: number,
    @Args('date', { type: () => Date }) date: Date,
    @Args('userId') userId: number,
    @Args('postId') postId: number,
  ) {
    const newComment = new Comment();
    newComment.content = content;
    newComment.rate = rate;
    newComment.date = date;

    newComment.user = { id: userId } as any;
    newComment.post = { id: postId } as any;
    return this.commentService.create(newComment);
  }
}
