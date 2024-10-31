import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.entity';

@Resolver(of => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  // Query para obtener todos los usuarios
  @Query(returns => [User])
  async users(): Promise<User[]> {
    return this.userService.findAll();
  }

  // Query para obtener un usuario por ID
  @Query(returns => User)
  async user(@Args('id') id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  // Mutación para crear un nuevo usuario sin DTO
  @Mutation(returns => User)
  async createUser(
    @Args('username') username: string,
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('profilePic') profilePic: string,
  ): Promise<User> {
    return this.userService.create({
        username, email, password, profilePic,
        id: 0,
        posts: [],
        comments: []
    });
  }

  // Mutación para actualizar un usuario
  @Mutation(returns => User)
  async updateUser(
    @Args('id') id: number,
    @Args('username') username: string,
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('profilePic') profilePic: string,
  ): Promise<User> {
    return this.userService.update(id, { username, email, password, profilePic });
  }

  // Mutación para eliminar un usuario
  @Mutation(returns => Boolean)
  async deleteUser(@Args('id') id: number): Promise<boolean> {
    return this.userService.remove(id);
  }
}
