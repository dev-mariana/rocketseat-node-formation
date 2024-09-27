import { UsersRepository } from '@/repositories/prisma/users.repository';
import { UserAlreadyExistsError } from '@/services/errors/user-already-exists-error';
import { RegisterUserService } from '@/services/register.service';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const createUserBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = createUserBodySchema.parse(request.body);

  try {
    const usersRepository = new UsersRepository();
    const registerUserService = new RegisterUserService(usersRepository);

    await registerUserService.create({
      name,
      email,
      password,
    });
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }

  return reply.status(201).send();
}
