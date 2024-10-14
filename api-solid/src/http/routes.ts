import { verifyJWT } from '@/middlewares/verify-jwt';
import { FastifyInstance } from 'fastify';
import { authentication } from './controllers/authentication.controller';
import { profile } from './controllers/profile.controller';
import { register } from './controllers/register.controller';

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register);
  app.post('/sessions', authentication);
  app.get('/me', { onRequest: [verifyJWT] }, profile);
}
