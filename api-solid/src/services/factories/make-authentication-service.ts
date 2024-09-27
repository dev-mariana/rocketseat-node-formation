import { UsersRepository } from '@/repositories/prisma/users.repository';
import { AuthenticationService } from '../authentication.service';

export function makeAuthenticationService() {
  const usersRepository = new UsersRepository();
  const authenticationService = new AuthenticationService(usersRepository);

  return authenticationService;
}
