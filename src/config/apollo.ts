import {
    ApolloClient,
    createHttpLink,
    from,
    InMemoryCache,
  } from '@apollo/client';
  import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
  
  export const cache = new InMemoryCache({
    addTypename: false,
  });
  
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message }) => {
        if (message === 'Context creation failed: Session token expired') {
          // Cookies.remove('metaquip-session');
        }
      });
    if (networkError) console.log(`[Network error]: ${networkError}`);
  });

  const authLink = setContext(async ctx => {
    try {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uSWQiOiI2NDYzNGZlOWM3OWYzZjEzM2YyZTFlZTIiLCJzZXNzaW9uVHlwZSI6InNlbmRlciIsImlhdCI6MTY5MDc5ODE2OCwiZXhwIjoxNjkwODg0NTY4fQ.j7fDNHK98XSX2m0G2_jbuNSqeZzsaB-efl4Po6aKkaI';
      if (token) {
        return {
          headers: {
            ...ctx,
            authorization: token ? `Bearer ${token}` : '',
          },
        };
      }
    } catch (error) {
      console.log('[apollo.ts > authLink]', error);
    }
  
    return { headers: ctx };
  });
  
  
  const httpLink = createHttpLink({
    uri: 'https://rohd0c5rac.execute-api.eu-west-2.amazonaws.com/carrywise/graphql',
  });
  
  export const client = new ApolloClient({
    link: from([errorLink, authLink, httpLink]),
    cache,
  });
  