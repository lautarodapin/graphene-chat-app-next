// import { ApolloClient, createHttpLink, InMemoryCache, split } from '@apollo/client';
// import { setContext } from '@apollo/client/link/context';
// import { WebSocketLink } from '@apollo/client/link/ws';

// const wsLink = process.browser ? new WebSocketLink({
//     uri: 'ws://localhost:8000/graphql/',
//     options: {
//         reconnect: true
//     }
// }) : null;


// const httpLink = createHttpLink({
//     uri: 'http://localhost:8000/graphql/',
// });

// const authLink = setContext((_, { headers }) => {
//     // get the authentication token from local storage if it exists
//     let token = localStorage.getItem('token');
//     // return the headers to the context so httpLink can read them
//     console.log(token)
//     if (!token) {
//         return { headers }
//     }
//     return {
//         headers: {
//             ...headers,
//             'Content-Type': 'application/json',
//             Authorization: token ? `JWT ${token}` : "",
//         }
//     }
// });

// const splitLink = process.browser ? split(
//     ({ query }) => {
//         const definition = getMainDefinition(query);
//         return (
//             definition.kind === 'OperationDefinition' &&
//             definition.operation === 'subscription'
//         );
//     },
//     wsLink,
//     httpLink,
// ) : httpLink;

// export const client = new ApolloClient({
//     link: authLink.concat(splitLink),
//     cache: new InMemoryCache()
// });

// import { onError } from '@apollo/link-error'
// import { setContext } from '@apollo/link-context'
// import { getMainDefinition } from 'apollo-utilities'
import {onError} from '@apollo/client/link/error'
import {getMainDefinition} from '@apollo/client/utilities'
import { setContext } from '@apollo/client/link/context';
import { WebSocketLink } from '@apollo/client/link/ws';
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, split } from '@apollo/client';



const wsLinkwithoutAuth = () =>
  new WebSocketLink({
    uri: WS_URL,
    options: {
      reconnect: true,
    },
  })

const wsLinkwithAuth = (token) =>
  new WebSocketLink({
    uri: 'ws://localhost:8000/graphql/',
    options: {
      reconnect: true,
      connectionParams: {
        authToken: `JWT ${token}`,
      },
    },
  })

function createIsomorphLink() {
  return new HttpLink({
    uri: 'http://localhost:8000/graphql/',
  })
}

function createWebSocketLink() {
    const token = localStorage.getItem("token")
  return token ? wsLinkwithAuth(token) : wsLinkwithoutAuth()
}

const errorLink = onError(({ networkError, graphQLErrors }) => {
  if (graphQLErrors) {
    graphQLErrors.map((err) => {
      console.warn(err.message)
    })
  }
  if (networkError) {
    console.warn(networkError)
  }
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token")
  const authorization = token ? `JWT ${token}` : null
  return token
    ? {
        headers: {
          ...headers,
          authorization,
        },
      }
    : {
        headers: {
          ...headers,
        },
      }
})

const httpLink = ApolloLink.from([errorLink, authLink, createIsomorphLink()])

export function createApolloClient(initialState = {}) {
  const ssrMode = typeof window === 'undefined'
  const cache = new InMemoryCache().restore(initialState)

  const link = ssrMode
    ? httpLink
    : process.browser
    ? split(
        ({ query }) => {
          const { kind, operation } = getMainDefinition(query)
          return kind === 'OperationDefinition' && operation === 'subscription'
        },
        createWebSocketLink(),
        httpLink
      )
    : httpLink

  return new ApolloClient({
    ssrMode,
    link,
    cache,
  })
}

export const client = createApolloClient()