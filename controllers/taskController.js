const Task = require('../models/Task');

module.exports = {
  create: async (request, reply) => {
    const { title, description, deadline } = request.body;
    const userId = request.user.id;
    const task = new Task({
      user: userId,
      title,
      description,
      deadline,
    });
    await task.save();
    reply.code(201).send(task);
  },

  list: async (request, reply) => {
    const userId = request.user.id;
    const offset = parseInt(request.query.offset) || 0;
    const limit = parseInt(request.query.limit) || 10;
    const tasks = await Task.find({ user: userId })
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit);
    const total = await Task.countDocuments({ user: userId });
    reply.send({ tasks, total });
  },

  update: async (request, reply) => {
    const { id } = request.params;
    const userId = request.user.id;
    const update = request.body;
    const task = await Task.findOneAndUpdate({ _id: id, user: userId }, update, { new: true });
    if (!task) return reply.code(404).send({ error: 'Task not found' });
    reply.send(task);
  },

  remove: async (request, reply) => {
    const { id } = request.params;
    const userId = request.user.id;
    const task = await Task.findOneAndDelete({ _id: id, user: userId });
    if (!task) return reply.code(404).send({ error: 'Task not found' });
    reply.send({ success: true });
  },

  markDone: async (request, reply) => {
    const { id } = request.params;
    const userId = request.user.id;
    const task = await Task.findOneAndUpdate({ _id: id, user: userId }, { status: 'done' }, { new: true });
    if (!task) return reply.code(404).send({ error: 'Task not found' });
    reply.send(task);
  },
};
