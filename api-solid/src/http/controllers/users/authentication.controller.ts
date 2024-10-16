import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error';
import { makeAuthenticationService } from '@/services/factories/make-authentication-service';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function authentication(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticationBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticationBodySchema.parse(request.body);

  try {
    const authenticationService = makeAuthenticationService();

    const { user } = await authenticationService.authenticate({
      email,
      password,
    });

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
        },
      },
    );

    return reply.status(200).send({ token });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message });
    }

    throw error;
  }
}
