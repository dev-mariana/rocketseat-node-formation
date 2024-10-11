import { UsersRepository } from '@/repositories/prisma/users.repository';
import { GetUserProfileService } from '../get-user-profile.service';

export function makeGetUserProfileService() {
  const usersRepository = new UsersRepository();
  const useCase = new GetUserProfileService(usersRepository);

  return useCase;
}
