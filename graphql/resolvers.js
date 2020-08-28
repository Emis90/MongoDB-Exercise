
const Message = require('../models/message'); 

const getAllMessages = () => { 
  return Message.find({});
}

const getOneMessage = (id) => {
  return Message.findById(id)
}

const createNewMessage = (args) => {
  let article = new Message(args.messageInput);
  return article.save();
}

const deleteMessage = (id) => {
  return Message.findByIdAndRemove(id);
}

//not needed, its just here for practice
const updateMessage = (message) => {
  return Message.findByIdAndUpdate(message.id, message.articleInput, { new: true }); 
}

module.exports = { getAllMessages, getOneMessage, createNewMessage, deleteMessage, updateMessage }