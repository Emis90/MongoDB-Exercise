
const Message = require('../models/message'); 

const getAllMessages = () => { 
  return Message.find({})
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

const apolloResolver =  {
  Query: {
    getAllMessagesWithApollo: () => {
      let data =  Message.find({});
      return data
    }
  }
}
const resolvers = { apolloResolver, getAllMessages, getOneMessage, createNewMessage, deleteMessage, updateMessage }

module.exports = resolvers