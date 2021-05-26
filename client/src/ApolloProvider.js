import {
    ApolloClient, 
    InMemoryCache, 
    createHttpLink, 
} from '@apollo/client'

const httpLink = createHttpLink({
    uri: 'http://localhost:5000'
})

export const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
})
