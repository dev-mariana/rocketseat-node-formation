import { GymsRepository } from '@/repositories/prisma/gyms.repository';
import { FetchNearbyGymsService } from '../fetch-nearby-gyms.service';

export function makeFetchNearbyGymsService() {
  const gymsRepository = new GymsRepository();
  const useCase = new FetchNearbyGymsService(gymsRepository);

  return useCase;
}
