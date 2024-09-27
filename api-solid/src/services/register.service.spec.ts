import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import bcrypt from 'bcryptjs';
import { beforeEach, describe, expect, it } from 'vitest';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';
import { RegisterUserService } from './register.service';

let usersRepository: InMemoryUsersRepository;
let sut: RegisterUserService;

describe('Register Service', () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository();
    sut = new RegisterUserService(usersRepository);
  });

  it('should be able to register', async () => {
    const { user } = await sut.create({
      name: 'Mari',
      email: 'm@gmail.com',
      password: '123456',
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('should hash user password upon registration', async () => {
    const { user } = await sut.create({
      name: 'Mari',
      email: 'm@gmail.com',
      password: '123456',
    });

    const isPasswordCorrectlyHashed = await bcrypt.compare(
      '123456',
      user.password_hash,
    );

    expect(isPasswordCorrectlyHashed).not.toBe('123456');
  });

  it('should not be able to register with same email twice', async () => {
    const email = 'm@gmail.com';

    await sut.create({
      name: 'Mari',
      email,
      password: '123456',
    });

    await expect(() =>
      sut.create({
        name: 'Mari',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
