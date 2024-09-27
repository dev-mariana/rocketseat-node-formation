import { FastifyInstance } from 'fastify';
import { authentication } from './controllers/authentication.controller';
import { register } from './controllers/register.controller';

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register);
  app.post('/sessions', authentication);
}
