import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'network-only',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
  },
};

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    AUTH_TOKEN: localStorage.getItem('authToken'),
  },
}));

export default new ApolloClient({
  link: authLink.concat(
    new HttpLink({
      uri: `http://localhost:5000/api`,
    }),
  ),
  cache: new InMemoryCache({
    addTypename: false,
  }),
  defaultOptions,
});
