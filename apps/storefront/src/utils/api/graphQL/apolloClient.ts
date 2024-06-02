// lib/apolloClient.js
import { ApolloClient, InMemoryCache, HttpLink, from, Observable } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { refreshToken } from '../rest/auth/refreshToken';
import { onError } from '@apollo/client/link/error';
const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_URL_SERVER_GRAPHQL, // Replace with your GraphQL endpoint
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('accessToken');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  }
});
export const onErrorCustom = onError(({ graphQLErrors, networkError, operation, forward }) => {
  console.log(graphQLErrors)
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      if (err.extensions.code === "FORBIDDEN") {
        return new Observable(observer => {
          (async () => {
            try {
              const res = await refreshToken();
              localStorage.setItem('accessToken', res.accessToken)
              const subscriber = {
                next: observer.next.bind(observer),
                error: observer.error.bind(observer),
                complete: observer.complete.bind(observer),
              };
              forward(operation).subscribe(subscriber);
            } catch (error) {
              observer.error(error);
            }
          })();
        });
      }
    }
  }

  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

const client = new ApolloClient({
  link: from([onErrorCustom,authLink.concat(httpLink)]),
  cache: new InMemoryCache(),
});

export default client;
