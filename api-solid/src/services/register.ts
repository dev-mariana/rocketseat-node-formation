import { UsersRepository } from '@/repositories/prisma/users.repository';
import { hash } from 'bcryptjs';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';

interface RegisterUserRequest {
  name: string;
  email: string;
  password: string;
}

export class RegisterUserService {
  constructor(private usersRepository: UsersRepository) {}

  async create({ name, email, password }: RegisterUserRequest) {
    const password_hash = await hash(password, 6);

    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new UserAlreadyExistsError();
    }

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    });
  }
}
