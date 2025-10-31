const authController = require('../controllers/authController');
const bcrypt = require('bcrypt');

module.exports = async function (fastify) {
  fastify.post('/register', {
    schema: {
      summary: 'Реєстрація користувача',
      body: {
        type: 'object',
        required: ['email', 'username', 'password'],
        properties: {
          email: { type: 'string', format: 'email' },
          username: { type: 'string' },
          password: { type: 'string' },
        },
      },
      response: {
        200: {
          type: 'object',
          properties: {
            token: { type: 'string' },
          },
        },
      },
    },
    handler: authController.register,
  });

  fastify.post('/login', {
    schema: {
      summary: 'Вхід користувача',
      body: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string', format: 'email' },
          password: { type: 'string' },
        },
      },
      response: {
        200: {
          type: 'object',
          properties: {
            token: { type: 'string' },
          },
        },
      },
    },
    handler: authController.login,
  });
};
