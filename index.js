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


app.listen(PORT, () => {console.log(`Server listening on port ${PORT} 🚀`) });