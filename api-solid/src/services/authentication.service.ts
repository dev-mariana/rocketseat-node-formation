import { UsersRepository } from '@/repositories/prisma/users.repository';
import { User } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';

interface AuthenticateRequest {
  email: string;
  password: string;
}

interface AuthenticateResponse {
  user: User;
}

export class AuthenticationService {
  constructor(private usersRepository: UsersRepository) {}

  async authenticate({
    email,
    password,
  }: AuthenticateRequest): Promise<AuthenticateResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const doesPasswordMatches = await bcrypt.compare(
      password,
      user.password_hash,
    );

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError();
    }

    return { user };
  }
}
