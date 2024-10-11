import { CheckInsRepository } from '@/repositories/prisma/check-ins.repository';
import { ValidateCheckInService } from '../validate-check-in.service';

export function makeValidateCheckInService() {
  const checkInsRepository = new CheckInsRepository();
  const useCase = new ValidateCheckInService(checkInsRepository);

  return useCase;
}
