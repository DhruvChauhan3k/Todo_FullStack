const { z } = require('zod');

const TodoSchema = z.object({
  title: z.string(),
  description: z.string()
});

module.exports = { TodoSchema };
