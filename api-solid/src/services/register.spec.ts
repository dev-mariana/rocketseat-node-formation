import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { compare } from 'bcryptjs';
import { beforeAll, describe, expect, it } from 'vitest';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';
import { RegisterUserService } from './register';

describe('Register Service', () => {
  beforeAll(async () => {});

  it('should be able to register', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerService = new RegisterUserService(usersRepository);

    const { user } = await registerService.create({
      name: 'Mari',
      email: 'm@gmail.com',
      password: '123456',
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('should hash user password upon registration', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerService = new RegisterUserService(usersRepository);

    const { user } = await registerService.create({
      name: 'Mari',
      email: 'm@gmail.com',
      password: '123456',
    });

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    );

    expect(isPasswordCorrectlyHashed).not.toBe('123456');
  });

  it('should not be able to register with same email twice', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerService = new RegisterUserService(usersRepository);

    const email = 'm@gmail.com';

    await registerService.create({
      name: 'Mari',
      email,
      password: '123456',
    });

    await expect(() =>
      registerService.create({
        name: 'Mari',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
