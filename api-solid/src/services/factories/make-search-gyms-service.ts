import { GymsRepository } from '@/repositories/prisma/gyms.repository';
import { SearchGymsService } from '../search-gyms.service';

export function makeSearchGymsService() {
  const gymsRepository = new GymsRepository();
  const useCase = new SearchGymsService(gymsRepository);

  return useCase;
}
