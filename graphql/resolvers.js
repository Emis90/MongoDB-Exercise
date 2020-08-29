const smtpTransport = require('nodemailer-smtp-transport')
const nodemailer = require('nodemailer');
const Message = require('../models/message'); 

const getAllMessages = async() => { 
  const data = await Message.find({})
  return data
}

const getOneMessage = (args) => {
  return Message.findById(args.id)
}

const createNewMessage = async({name, content, from, to, pass, subject}) => {
  console.log('args ', name, content, from, to, subject, pass)
  try {
    let transport = nodemailer.createTransport(smtpTransport({
      service: 'Gmail',
      secure: false,
      auth: {
        user: from,
        pass,
      }
    }))
    let bodyToSend = {
      from,
      to,
      subject,
      text: content
    }
    transport.sendMail(bodyToSend, (err, info) => {
        if (err) {
          console.log(err)
        } else {
         console.log('success!!')
        }
      });
      let article = await new Message({name, content});
      return article.save()
    } catch (error) {
      throw(error)
    }
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