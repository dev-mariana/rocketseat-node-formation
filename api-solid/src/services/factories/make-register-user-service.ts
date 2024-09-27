import { UsersRepository } from '@/repositories/prisma/users.repository';
import { RegisterUserService } from '../register.service';

export function makeRegisterUserService() {
  const usersRepository = new UsersRepository();
  const registerUserService = new RegisterUserService(usersRepository);

  return registerUserService;
}
