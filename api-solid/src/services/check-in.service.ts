import { ICheckInsRepository } from '@/repositories/interfaces/check-ins.interface';
import { IGymsRepository } from '@/repositories/interfaces/gyms.interface';
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates';
import { CheckIn } from '@prisma/client';
import { MaxDistanceError } from './errors/max-distance-error';
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface CheckinRequest {
  user_id: string;
  gym_id: string;
  user_latitude: number;
  user_longitude: number;
}

interface CheckinResponse {
  checkIn: CheckIn;
}

export class CheckInService {
  constructor(
    private checkInsRepository: ICheckInsRepository,
    private gymsRepository: IGymsRepository,
  ) {}

  async checkIn({
    user_id,
    gym_id,
    user_latitude,
    user_longitude,
  }: CheckinRequest): Promise<CheckinResponse> {
    const gym = await this.gymsRepository.findById(gym_id);

    if (!gym) {
      throw new ResourceNotFoundError();
    }

    const distance = getDistanceBetweenCoordinates(
      {
        latitude: user_latitude,
        longitude: user_longitude,
      },
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      },
    );

    const MAX_DISTANCE_IN_KILOMETERS = 0.1;

    if (distance > MAX_DISTANCE_IN_KILOMETERS) {
      throw new MaxDistanceError();
    }

    const checkInAlreadyExists =
      await this.checkInsRepository.findByUserIdOnDate(user_id, new Date());

    if (checkInAlreadyExists) {
      throw new MaxNumberOfCheckInsError();
    }

    const checkIn = await this.checkInsRepository.create({
      user_id,
      gym_id,
    });

    return { checkIn };
  }
}
