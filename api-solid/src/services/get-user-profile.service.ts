import { UsersRepository } from '@/repositories/prisma/users.repository';
import { User } from '@prisma/client';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface GetUserProfileRequest {
  user_id: string;
}

interface GetUserProfileResponse {
  user: User;
}

export class GetUserProfileService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    user_id,
  }: GetUserProfileRequest): Promise<GetUserProfileResponse> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    return { user };
  }
}
