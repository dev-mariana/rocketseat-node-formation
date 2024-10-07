import { IGymsRepository } from '@/repositories/interfaces/gyms.interface';
import { Gym } from '@prisma/client';

interface FetchNearbyGymsRequest {
  userLatitude: number;
  userLongitude: number;
}

interface FetchNearbyGymsResponse {
  gyms: Gym[];
}

export class FetchNearbyGymsService {
  constructor(private gymsRepository: IGymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearbyGymsRequest): Promise<FetchNearbyGymsResponse> {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    });

    return { gyms };
  }
}
