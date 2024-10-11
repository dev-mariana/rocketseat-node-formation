import { GymsRepository } from '@/repositories/prisma/gyms.repository';
import { CreateGymService } from '../create-gym.service';

export function makeCreateGymService() {
  const gymsRepository = new GymsRepository();
  const useCase = new CreateGymService(gymsRepository);

  return useCase;
}
