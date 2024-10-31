import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post } from './post.entity';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  // Query para obtener todos los posts
  @Query(() => [Post])
  findAllPosts() {
    return this.postService.findAll();
  }

  // Query para obtener un post por ID
  @Query(() => Post)
  findPostzById(@Args('id', { type: () => Int }) id: number) {
    return this.postService.findOne(id);
  }

  // Mutación para crear un nuevo post
  @Mutation(() => Post)
  createPost(
    @Args('title') title: string,
    @Args('content') content: string,
    @Args('userId', { type: () => Int }) userId: number,
  ) {
    const newPost = new Post();
    newPost.title = title;
    newPost.content = content;
    newPost.user = { id: userId } as any; // Relación con el usuario
    return this.postService.create(newPost);
  }

  // Mutación para actualizar un post
  @Mutation(() => Post)
  updatePost(
    @Args('id', { type: () => Int }) id: number,
    @Args('title') title: string,
    @Args('content') content: string,
  ) {
    return this.postService.update(id, { title, content });
  }

  // Mutación para eliminar un post
  @Mutation(() => Boolean)
  deletePost(@Args('id', { type: () => Int }) id: number): Promise<boolean> {
    return this.postService.remove(id);
  }
}

