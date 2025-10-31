const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = {
  register: async (request, reply) => {
    const { email, username, password } = request.body;
    if (!email || !username || !password) {
      return reply.code(400).send({ error: 'Missing fields' });
    }
    const exists = await User.findOne({ email });
    if (exists) {
      return reply.code(409).send({ error: 'Email already registered' });
    }
    const hash = await bcrypt.hash(password, 10);
    const user = new User({ email, username, password: hash });
    await user.save();
    const token = await reply.jwtSign({ id: user._id, email: user.email });
    reply.send({ token });
  },

  login: async (request, reply) => {
    const { email, password } = request.body;
    const user = await User.findOne({ email });
    if (!user) {
      return reply.code(401).send({ error: 'Invalid credentials' });
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return reply.code(401).send({ error: 'Invalid credentials' });
    }
    const token = await reply.jwtSign({ id: user._id, email: user.email });
    reply.send({ token });
  },
};
