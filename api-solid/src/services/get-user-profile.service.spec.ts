import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import bcrypt from 'bcryptjs';
import { beforeEach, describe, expect, it } from 'vitest';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { GetUserProfileService } from './get-user-profile.service';

let usersRepository: InMemoryUsersRepository;
let sut: GetUserProfileService;

describe('Get User Profile Service', () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileService(usersRepository);
  });

  it('should be able to get user profile', async () => {
    const createdUser = await usersRepository.create({
      name: 'Mari',
      email: 'm@gmail.com',
      password_hash: await bcrypt.hash('123456', 6),
    });

    const { user } = await sut.execute({
      user_id: createdUser.id,
    });

    expect(user.name).toEqual('Mari');
  });

  it('should not be able to get user profile with wrong id', async () => {
    await expect(() =>
      sut.execute({
        user_id: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
