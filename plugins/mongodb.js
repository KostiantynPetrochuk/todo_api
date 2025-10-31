const fp = require('fastify-plugin');
const mongoose = require('mongoose');

module.exports = fp(async (fastify) => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    fastify.decorate('mongoose', mongoose);
    fastify.log.info('MongoDB connected');
  } catch (err) {
    fastify.log.error('MongoDB connection error:', err);
    process.exit(1);
  }
});
