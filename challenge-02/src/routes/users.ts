import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { knex } from '../database';

export async function UsersRoutes(app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    const createUserBodySchema = z.object({
      name: z.string(),
      email: z.string(),
    });

    const { name, email } = createUserBodySchema.parse(request.body);

    await knex('users').insert({
      id: crypto.randomUUID(),
      name,
      email,
    });

    return reply.status(201).send();
  });
}
