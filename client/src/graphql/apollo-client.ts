import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include',
});

// export to _app
export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
