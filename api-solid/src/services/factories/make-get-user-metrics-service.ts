import { CheckInsRepository } from '@/repositories/prisma/check-ins.repository';
import { GetUserMetricsService } from '../get-user-metrics.service';

export function makeGetUserMetricsService() {
  const checkInsRepository = new CheckInsRepository();
  const useCase = new GetUserMetricsService(checkInsRepository);

  return useCase;
}
