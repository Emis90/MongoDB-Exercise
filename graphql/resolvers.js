
const Message = require('../models/message'); 

const getAllMessages = async() => { 
  const data = await Message.find({})
  return data
}

const getOneMessage = (args) => {
  return Message.findById(args.id)
}

const createNewMessage = (args) => {
  let article = new Message(args.messageInput);
  return article.save();
}

const deleteMessage = (args) => {
  return Message.findByIdAndRemove(args.id);
}

//not needed, its just here for practice
const updateMessage = (message) => {
  return Message.findByIdAndUpdate(message.id, message.articleInput, { new: true }); 
}


const resolvers = { getAllMessages, getOneMessage, createNewMessage, deleteMessage, updateMessage }

module.exports = resolvers