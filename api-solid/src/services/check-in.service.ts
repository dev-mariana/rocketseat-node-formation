import { ICheckInsRepository } from '@/repositories/check-ins.interface';
import { CheckIn } from '@prisma/client';

interface CheckinRequest {
  user_id: string;
  gym_id: string;
}

interface CheckinResponse {
  checkIn: CheckIn;
}

export class CheckInService {
  constructor(private checkInsRepository: ICheckInsRepository) {}

  async checkIn({ user_id, gym_id }: CheckinRequest): Promise<CheckinResponse> {
    const checkInAlreadyExists =
      await this.checkInsRepository.findByUserIdOnDate(user_id, new Date());

    if (checkInAlreadyExists) {
      throw new Error('Check-in already exists');
    }

    const checkIn = await this.checkInsRepository.create({
      user_id,
      gym_id,
    });

    return { checkIn };
  }
}
