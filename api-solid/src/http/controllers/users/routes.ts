import { verifyJWT } from '@/middlewares/verify-jwt';
import { FastifyInstance } from 'fastify';
import { authentication } from './authentication.controller';
import { profile } from './profile.controller';
import { refresh } from './refresh.controller';
import { register } from './register.controller';

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register);
  app.post('/sessions', authentication);
  app.patch('/token/refresh', refresh);
  app.get('/me', { onRequest: [verifyJWT] }, profile);
}
