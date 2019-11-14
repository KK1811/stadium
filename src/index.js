import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// 1
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'

import { AUTH_TOKEN } from './constants'

// import 'bootstrap/dist/css/bootstrap.min.css';

// 2
const httpLink = createHttpLink({
  uri: 'http://10.0.34.205:8000/graphql/'
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN)
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

// 3
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

// 4
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)
serviceWorker.unregister();
