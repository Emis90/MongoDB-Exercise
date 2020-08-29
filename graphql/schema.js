const{ buildSchema } = require('graphql'); 
const schema =  buildSchema(` 
type Message { 
  id: ID!
  name: String!
  content: String!
}
input MessageInput { 
  name: String!
  content: String!
  from: String!
  to: String!
  subject: String!
  pass: String!
}
type Query { 
  getOneMessage(id: ID!): Message
  getAllMessages: [Message]
}
type Mutation { 
  createNewMessage(  
    name: String!
    content: String!
    from: String!
    to: String!
    subject: String!
    pass: String!): Message
  deleteMessage(id: ID!): Message
  updateMessage(id: ID!, messageInput: MessageInput): Message!
}
`)

module.exports = schema;