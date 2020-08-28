const { Schema, model } = require('mongoose');

const messageSchema = new Schema({ 
  name: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
});

module.exports = model('Message', messageSchema); 