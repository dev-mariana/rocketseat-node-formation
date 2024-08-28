import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { knex } from '../database';
import { checkSessionIdExists } from '../middlewares/check-session-id-exists';
import { checkMealIdExists } from './helpers/check-meal-id-exists';

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

  app.get(
    '/:id',
    { preHandler: [checkSessionIdExists] },
    async (request, reply) => {
      const getMealsParamsSchema = z.object({
        id: z.string().uuid(),
      });

      const { id } = getMealsParamsSchema.parse(request.params);

      const meal = await checkMealIdExists(id);

      return reply.status(200).send({ meal });
    },
  );

  app.put(
    '/:id',
    { preHandler: [checkSessionIdExists] },
    async (request, reply) => {
      const updateMealParamsSchema = z.object({
        id: z.string().uuid(),
      });

      const updateMealBodySchema = z.object({
        name: z.string(),
        description: z.string(),
        isDiet: z.boolean(),
        datetime: z.string(),
      });

      const { id } = updateMealParamsSchema.parse(request.params);

      const { name, description, isDiet, datetime } =
        updateMealBodySchema.parse(request.body);

      const meal = await checkMealIdExists(id);

      if (!meal) {
        return reply.status(404).send({
          error: 'Meal not found.',
        });
      }

      await knex('meals')
        .update({
          name,
          description,
          isDiet,
          datetime,
        })
        .where({ id });

      return reply.status(204).send();
    },
  );

  app.delete(
    '/:id',
    { preHandler: [checkSessionIdExists] },
    async (request, reply) => {
      const deleteMealParamsSchema = z.object({
        id: z.string().uuid(),
      });

      const { id } = deleteMealParamsSchema.parse(request.params);

      const meal = await checkMealIdExists(id);

      if (!meal) {
        return reply.status(404).send({
          error: 'Meal not found.',
        });
      }

      await knex('meals').delete().where({ id });

      return reply.status(204).send();
    },
  );

  app.get(
    '/users/:user_id',
    { preHandler: [checkSessionIdExists] },
    async (request, reply) => {
      const getMealsParamsSchema = z.object({
        user_id: z.string().uuid(),
      });

      const { user_id } = getMealsParamsSchema.parse(request.params);
      const mealsFromUser = await knex('meals').where({ user_id }).select();

      if (mealsFromUser.length <= 0) {
        return reply
          .status(404)
          .send({ error: 'No meals found for this user.' });
      }

      return reply.status(200).send({ meals: mealsFromUser });
    },
  );
}
