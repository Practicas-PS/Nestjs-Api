import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}

  // Obtener todos los posts
  findAll(): Promise<Post[]> {
    return this.postRepository.find({ relations: ['user', 'comments'] });
  }

  // Obtener un post por su ID
  findOne(id: number): Promise<Post> {
    return this.postRepository.findOne({ where: { id }, relations: ['user', 'comments'] });
  }

  // Crear un nuevo post
  create(post: Post): Promise<Post> {
    return this.postRepository.save(post);
  }

  // Actualizar un post
  async update(id: number, postData: Partial<Post>): Promise<Post> {
    await this.postRepository.update(id, postData);
    return this.findOne(id);
  }

  // Eliminar un post
  async remove(id: number): Promise<boolean> {
    const result = await this.postRepository.delete(id);
    return result.affected > 0;
  }
}

