import { CheckInsRepository } from '@/repositories/prisma/check-ins.repository';
import { FetchUserCheckInsHistoryService } from '../fetch-user-check-ins-history.service';

export function makeFetchUserCheckInsHistoryService() {
  const checkInsRepository = new CheckInsRepository();
  const useCase = new FetchUserCheckInsHistoryService(checkInsRepository);

  return useCase;
}
