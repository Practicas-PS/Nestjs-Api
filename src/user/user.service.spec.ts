import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

describe('UserService', () => {
  let service: UserService;
  let repository: Repository<User>;

  // Mock de datos
  const mockUser: User = {
    id: 1,
    username: 'user1',
    email: 'user1@example.com',
    password: 'password123',
    profilePic: 'url_to_profile_pic1',
    posts: [],
    comments: [],
  };

  // Mock del repositorio
  const mockRepository = {
    findOne: jest.fn().mockResolvedValue(mockUser),
    find: jest.fn().mockResolvedValue([mockUser]),
    save: jest.fn().mockResolvedValue(mockUser),
    update: jest.fn().mockResolvedValue({ affected: 1 }),
    delete: jest.fn().mockResolvedValue({ affected: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all users', async () => {
    const users = await service.findAll();
    expect(repository.find).toHaveBeenCalledWith({ relations: ['posts', 'comments'] });
    expect(users).toEqual([mockUser]);
  });

  it('should find a user by ID', async () => {
    const user = await service.findOne(1);
    expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 }, relations: ['posts', 'comments'] });
    expect(user).toEqual(mockUser);
  });

  it('should create a user', async () => {
    const createdUser = await service.create(mockUser);
    expect(repository.save).toHaveBeenCalledWith(mockUser);
    expect(createdUser).toEqual(mockUser);
  });

  it('should update a user', async () => {
    const updatedUser = await service.update(1, { username: 'userUpdated' });
    expect(repository.update).toHaveBeenCalledWith(1, { username: 'userUpdated' });
    expect(updatedUser).toEqual(mockUser);
  });

  it('should remove a user', async () => {
    const result = await service.remove(1);
    expect(repository.delete).toHaveBeenCalledWith(1);
    expect(result).toBe(true);
  });

  it('should return false if remove fails', async () => {
    // Simulando que la eliminación no afecta ningún registro
    mockRepository.delete.mockResolvedValue({ affected: 0 });
    const result = await service.remove(1);
    expect(result).toBe(false);
  });
});
