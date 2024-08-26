import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { knex } from '../database';
import { checkSessionIdExists } from '../middlewares/check-session-id-exists';

export async function mealsRoutes(app: FastifyInstance) {
  app.post(
    '/',
    { preHandler: [checkSessionIdExists] },
    async (request, reply) => {
      const createMealBodySchema = z.object({
        name: z.string(),
        description: z.string(),
        isDiet: z.boolean(),
        datetime: z.string(),
        user_id: z.string(),
      });

      const { name, description, isDiet, datetime, user_id } =
        createMealBodySchema.parse(request.body);

      await knex('meals').insert({
        id: crypto.randomUUID(),
        name,
        description,
        isDiet,
        datetime,
        user_id,
      });

      return reply.status(201).send();
    },
  );
}
