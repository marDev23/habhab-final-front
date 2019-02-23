import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import ApolloClient from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'
import 'semantic-ui-css/semantic.min.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

const link = createHttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include'
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
})

ReactDOM.render(
	<Router>
    	<ApolloProvider client={client}>
			<App />
		</ApolloProvider>
	</Router>, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
