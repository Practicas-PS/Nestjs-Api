import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './coment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
  ) {}

  // Obtener todos los comentarios
  findAll(): Promise<Comment[]> {
    return this.commentRepository.find({ relations: ['user', 'post'] });
  }

  // Obtener un comentario por ID
  findOne(id: number): Promise<Comment> {
    return this.commentRepository.findOne({ where: { id }, relations: ['user', 'post'] });
  }

  // Crear un nuevo comentario
  async create(comment: Comment): Promise<Comment> {
    return this.commentRepository.save(comment);
  }

  // Actualizar un comentario
  async update(id: number, updateCommentData: Partial<Comment>): Promise<Comment> {
    await this.commentRepository.update(id, updateCommentData);
    return this.findOne(id); // Retornar el comentario actualizado
  }

  // Eliminar un comentario
  async remove(id: number): Promise<void> {
    await this.commentRepository.delete(id);
  }

  // Método para encontrar los comentarios por postId
  async findByPostId(postId: number): Promise<Comment[]> {
    return this.commentRepository.find({
      where: { post: { id: postId } },
    });
  }
}
