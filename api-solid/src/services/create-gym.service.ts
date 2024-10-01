import { IGymsRepository } from '@/repositories/interfaces/gyms.interface';
import { Gym } from '@prisma/client';

interface CreateGymRequest {
  title: string;
  description: string | null;
  phone: string | null;
  latitude: number;
  longitude: number;
}

interface CreateGymResponse {
  gym: Gym;
}

export class CreateGymService {
  constructor(private gymsRepository: IGymsRepository) {}

  async create({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: CreateGymRequest): Promise<CreateGymResponse> {
    const gym = await this.gymsRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude,
    });

    return { gym };
  }
}
