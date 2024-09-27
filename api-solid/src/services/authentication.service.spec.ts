import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import bcrypt from 'bcryptjs';
import { beforeEach, describe, expect, it } from 'vitest';
import { AuthenticationService } from './authentication.service';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticationService;

describe('Authentication Service', () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticationService(usersRepository);
  });

  it('should be able to authenticate', async () => {
    await usersRepository.create({
      name: 'Mari',
      email: 'm@gmail.com',
      password_hash: await bcrypt.hash('123456', 6),
    });

    const { user } = await sut.authenticate({
      email: 'm@gmail.com',
      password: '123456',
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.authenticate({
        email: 'm@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      name: 'Mari',
      email: 'm@gmail.com',
      password_hash: await bcrypt.hash('123456', 6),
    });

    await expect(() =>
      sut.authenticate({
        email: 'm@gmail.com',
        password: '654321',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
