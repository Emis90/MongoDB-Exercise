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
}
type Query { 
  getOneMessage(id: ID!): Message
  getAllMessages: [Message]
}
type Mutation { 
  createNewMessage(messageInput: MessageInput): Message
  deleteMessage(id: ID!): Message
  updateMessage(id: ID!, messageInput: MessageInput): Message!
}
schema { 
  query: Query
  mutation: Mutation
}
`)

module.exports = schema;