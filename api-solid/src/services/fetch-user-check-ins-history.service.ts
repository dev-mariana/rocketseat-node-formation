import { ICheckInsRepository } from '@/repositories/interfaces/check-ins.interface';
import { CheckIn } from '@prisma/client';

interface FetchUserCheckInsHistoryRequest {
  user_id: string;
  page: number;
}

interface FetchUserCheckInsHistoryResponse {
  checkIns: CheckIn[];
}

export class FetchUserCheckInsHistoryService {
  constructor(private checkInsRepository: ICheckInsRepository) {}

  async execute({
    user_id,
    page,
  }: FetchUserCheckInsHistoryRequest): Promise<FetchUserCheckInsHistoryResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      user_id,
      page,
    );

    return { checkIns };
  }
}
