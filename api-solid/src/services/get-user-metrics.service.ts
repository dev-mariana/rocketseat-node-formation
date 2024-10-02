import { ICheckInsRepository } from '@/repositories/interfaces/check-ins.interface';

interface GetUserMetricsRequest {
  user_id: string;
}

interface GetUserMetricsResponse {
  checkInsCount: number;
}

export class GetUserMetricsService {
  constructor(private checkInsRepository: ICheckInsRepository) {}

  async execute({
    user_id,
  }: GetUserMetricsRequest): Promise<GetUserMetricsResponse> {
    const checkInsCount = await this.checkInsRepository.countByUserId(user_id);

    return { checkInsCount };
  }
}
