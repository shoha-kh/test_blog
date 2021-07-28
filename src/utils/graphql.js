import { store } from '@/store';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { onError } from '@apollo/client/link/error'
import { logErrorMessages } from '@vue/apollo-util'

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: 'https://graphqlzero.almansi.me/api',
})

const errorLink = onError(error => {
  if (error.networkError) {
    store.state.errorWindow.isActive = true
    store.state.errorWindow.message = {
      statusCode: error.networkError.statusCode,
      name: error.networkError.name
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    logErrorMessages(error)
  }
})

export default new ApolloClient({
  link: errorLink.concat(httpLink),
  cache: new InMemoryCache(),
  connectToDevTools: true
});