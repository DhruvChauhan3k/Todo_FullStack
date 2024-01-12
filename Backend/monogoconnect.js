const mongoose = require('mongoose');
require('dotenv').config()
mongoose.connect(process.env.MONGO_URL);
const todoSchema = new mongoose.Schema({
    title: { type: String},
    description: { type: String},
    completed:{type: Boolean}
  });
  
  const Todomodel = mongoose.model('Todo', todoSchema);
  
  module.exports= {Todomodel}