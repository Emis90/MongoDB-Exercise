//everything starts with setting up a server and sending a message!
const express = require('express');
const morgan = require('morgan');
const app = express();
const PORT = 8000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const {graphqlHTTP} = require('express-graphql');
const schema = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
const smtpTransport = require('nodemailer-smtp-transport')
const nodemailer = require('nodemailer');
const { createNewMessage } = require('./graphql/resolvers')
//mongodb api key=07b05601-c86e-4d69-ad4f-93cc411bdd7f
//mongodb+srv://enida:apples12345@cluster0.5p8ra.mongodb.net/test?retryWrites=true&w=majority
let transport = nodemailer.createTransport(smtpTransport({
  service: 'Gmail',
  secure: false,
  auth: {
    user: process.env.FROM_EMAIL,
    pass: process.env.PASSWORD
  }
}))

const message = {
  from: process.env.FROM_EMAIL, 
  to: process.env.TO_EMAIL,
  subject: 'Sending message from NODEJS', 
  text: 'Message from test'
};


mongoose.connect("mongodb+srv://enida:apples12345@cluster0.5p8ra.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true  }); 
mongoose.connection.once('open', () => { 
  console.log('Connected to the Database.');
});
mongoose.connection.on('error', (error) => {
  console.log('Mongoose Connection Error : ' + error);
});

app.use(bodyParser.json());
app.use(morgan('dev'))
app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => { 
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/user', (req, res) => {
  transport.sendMail(message, function(err, info) {
      console.log('transport sending...')
      if (err) {
        console.log(err)
      } else {
        console.log(info);
        createNewMessage({messageInput: {name: 'Enida', content: message.text}})
      }
      console.log('...transport ended')
    });

    res.send('....sending message')
})


app.use("/graphql", graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true
  }));




app.listen(PORT, () => {console.log(`Server listening on port ${PORT}`) });