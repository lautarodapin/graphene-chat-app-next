import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';


const httpLink = createHttpLink({
    uri: 'http://localhost:8000/graphql/',
});

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    let token = localStorage.getItem('token');
    // return the headers to the context so httpLink can read them
    console.log(token)
    if (!token) {
        return {headers}
    }
    return {
        headers: {
            ...headers,
            'Content-Type': 'application/json',
            Authorization: token ? `JWT ${token}` : "",
        }
    }
});

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});