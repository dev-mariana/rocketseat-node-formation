import { verifyJWT } from '@/middlewares/verify-jwt';
import { FastifyInstance } from 'fastify';
import { authentication } from './authentication.controller';
import { profile } from './profile.controller';
import { register } from './register.controller';

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register);
  app.post('/sessions', authentication);
  app.get('/me', { onRequest: [verifyJWT] }, profile);
}
