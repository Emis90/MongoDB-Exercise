import React from 'react'
import ReactDOM from 'react-dom'
import Main from './components/Main'
import { ApolloProvider } from "react-apollo";
import { InMemoryCache, ApolloClient } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql',
  cache: new InMemoryCache(),
});


ReactDOM.render(
  <ApolloProvider client={client}>
    <Main />
  </ApolloProvider>,
  document.getElementById('app') 
)
