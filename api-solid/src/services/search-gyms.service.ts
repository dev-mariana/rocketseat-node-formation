import { IGymsRepository } from '@/repositories/interfaces/gyms.interface';
import { Gym } from '@prisma/client';

interface SearchGymsRequest {
  query: string;
  page: number;
}

interface SearchGymsResponse {
  gyms: Gym[];
}

export class SearchGymsService {
  constructor(private gymsRepository: IGymsRepository) {}

  async search({
    query,
    page,
  }: SearchGymsRequest): Promise<SearchGymsResponse> {
    const gyms = await this.gymsRepository.searchMany(query, page);

    return { gyms };
  }
}
