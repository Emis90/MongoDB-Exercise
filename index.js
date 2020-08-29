//everything starts with setting up a server and sending a message!
const express = require('express');
const morgan = require('morgan');
const app = express();
const PORT = 8000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
const smtpTransport = require('nodemailer-smtp-transport')
const nodemailer = require('nodemailer');



mongoose.connect(`mongodb+srv://enida:apples12345@cluster0.5p8ra.mongodb.net/test?retryWrites=true&w=majority`, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true }); 
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

app.use("/graphql", graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: true
}));

app.get('/messages', async(req, res)=> {
  let data = await resolvers.getAllMessages({})
  res.send(data)
})

app.post('/', (req, res) => {
  console.log(req.body)
  try {
  let transport = nodemailer.createTransport(smtpTransport({
    service: 'Gmail',
    secure: false,
    auth: {
      user: req.body.from,
      pass: req.body.pass
    }
  }))
  let bodyToSend = {
    from: req.body.from,
    to: req.body.to,
    subject: req.body.subject,
    text: req.body.body
  }
  transport.sendMail(bodyToSend, (err, info) => {
      if (err) {
        console.log(err)
      } else {
        // using callback function to send message to database
     resolvers.createNewMessage({messageInput: {name: bodyToSend.from, content: bodyToSend.text}})
      }
    });
  } catch (error) {
    throw(error)
  }
})

app.listen(PORT, () => {console.log(`Server listening on port ${PORT} 🚀`) });