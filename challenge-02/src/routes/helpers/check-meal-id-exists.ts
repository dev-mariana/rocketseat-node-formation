import { knex } from '../../database';

export async function checkMealIdExists(id: string) {
  const meal = await knex('meals').where({ id }).first();

  if (!meal) {
    return new Error('Meal not found.');
  }

  return meal;
}
