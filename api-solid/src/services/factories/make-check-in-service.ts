import { CheckInsRepository } from '@/repositories/prisma/check-ins.repository';
import { GymsRepository } from '@/repositories/prisma/gyms.repository';
import { CheckInService } from '../check-in.service';

export function makeCheckInService() {
  const checkInsRepository = new CheckInsRepository();
  const gymsRepository = new GymsRepository();

  const useCase = new CheckInService(checkInsRepository, gymsRepository);

  return useCase;
}
