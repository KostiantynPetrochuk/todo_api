require('dotenv').config();
const fastify = require('fastify')({ logger: true });

fastify.register(require('@fastify/swagger'), {
  swagger: {
    info: {
      title: 'Todo API',
      description: 'Fastify Todo API with JWT and MongoDB',
      version: '1.0.0'
    },
    host: 'localhost:3000',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    securityDefinitions: {
      Bearer: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header'
      }
    },
    security: [{ Bearer: [] }]
  }
});

fastify.register(require('@fastify/swagger-ui'), {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'list',
    deepLinking: false
  },
  staticCSP: true
});

fastify.register(require('./plugins/mongodb'));
fastify.register(require('./plugins/jwt'));
fastify.register(require('./routes/auth'), { prefix: '/auth' });
fastify.register(require('./routes/task'), { prefix: '/tasks' });

fastify.listen({ port: 3000, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`Server running on ${address}`);
  fastify.log.info('Swagger docs at http://localhost:3000/docs');
});
