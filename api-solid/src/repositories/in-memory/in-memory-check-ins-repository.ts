import { CheckIn, Prisma } from '@prisma/client';
import { randomUUID } from 'crypto';
import { ICheckInsRepository } from '../check-ins.interface';

export class InMemoryCheckInsRepository implements ICheckInsRepository {
  public items: CheckIn[] = [];

  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkin = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    };

    this.items.push(checkin);

    return checkin;
  }
}
