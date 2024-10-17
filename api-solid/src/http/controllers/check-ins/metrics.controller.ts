import { makeGetUserMetricsService } from '@/services/factories/make-get-user-metrics-service';
import { FastifyReply, FastifyRequest } from 'fastify';

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  const getUserMetricsUseCase = makeGetUserMetricsService();

  const { checkInsCount } = await getUserMetricsUseCase.execute({
    user_id: request.user.sub,
  });

  return reply.status(200).send({
    checkInsCount,
  });
}
