const taskController = require('../controllers/taskController');

module.exports = async function (fastify) {
  fastify.addHook('onRequest', fastify.authenticate);

  fastify.get('/', {
    schema: {
      summary: 'Список тасок з пагінацією',
      querystring: {
        type: 'object',
        properties: {
          offset: { type: 'integer', default: 0 },
          limit: { type: 'integer', default: 10 },
        },
      },
      response: {
        200: {
          type: 'object',
          properties: {
            tasks: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  _id: { type: 'string' },
                  title: { type: 'string' },
                  description: { type: 'string' },
                  deadline: { type: 'string', format: 'date-time' },
                  status: { type: 'string' },
                  createdAt: { type: 'string', format: 'date-time' },
                },
              },
            },
            total: { type: 'integer' },
          },
        },
      },
    },
    handler: async (request, reply) => {
      request.user = await fastify.jwt.decode(request.headers.authorization?.split(' ')[1]);
      return taskController.list(request, reply);
    },
  });

  fastify.post('/', {
    schema: {
      summary: 'Створити таску',
      body: {
        type: 'object',
        required: ['title'],
        properties: {
          title: { type: 'string' },
          description: { type: 'string' },
          deadline: { type: 'string', format: 'date-time' },
        },
      },
      response: {
        201: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            title: { type: 'string' },
            description: { type: 'string' },
            deadline: { type: 'string', format: 'date-time' },
            status: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
      },
    },
    handler: async (request, reply) => {
      request.user = await fastify.jwt.decode(request.headers.authorization?.split(' ')[1]);
      return taskController.create(request, reply);
    },
  });

  fastify.put('/:id', {
    schema: {
      summary: 'Редагувати таску',
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' },
        },
      },
      body: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          description: { type: 'string' },
          deadline: { type: 'string', format: 'date-time' },
          status: { type: 'string' },
        },
      },
      response: {
        200: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            title: { type: 'string' },
            description: { type: 'string' },
            deadline: { type: 'string', format: 'date-time' },
            status: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
      },
    },
    handler: async (request, reply) => {
      request.user = await fastify.jwt.decode(request.headers.authorization?.split(' ')[1]);
      return taskController.update(request, reply);
    },
  });

  fastify.delete('/:id', {
    schema: {
      summary: 'Видалити таску',
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' },
        },
      },
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
          },
        },
      },
    },
    handler: async (request, reply) => {
      request.user = await fastify.jwt.decode(request.headers.authorization?.split(' ')[1]);
      return taskController.remove(request, reply);
    },
  });

  fastify.patch('/:id/done', {
    schema: {
      summary: 'Позначити таску як виконану',
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' },
        },
      },
      response: {
        200: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            title: { type: 'string' },
            description: { type: 'string' },
            deadline: { type: 'string', format: 'date-time' },
            status: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
      },
    },
    handler: async (request, reply) => {
      request.user = await fastify.jwt.decode(request.headers.authorization?.split(' ')[1]);
      return taskController.markDone(request, reply);
    },
  });
};
