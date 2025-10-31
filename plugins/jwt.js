const fp = require('fastify-plugin');

module.exports = fp(async (fastify) => {
  fastify.register(require('@fastify/jwt'), {
    secret: process.env.JWT_SECRET,
  });

  fastify.decorate('authenticate', async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.code(401).send({ error: 'Unauthorized' });
    }
  });
});
