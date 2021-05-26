import {
    ApolloClient, 
    InMemoryCache, 
    createHttpLink, 
} from '@apollo/client'

import { setContext } from 'apollo-link-context';

const authLink = setContext(() => {
    const token = localStorage.getItem("token")
    return{
        headers: {
            Authorization: token ? `Bearer ${token}` : ''
        }
    }
})
const httpLink = createHttpLink({
    uri: 'http://localhost:5000'
})


export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
})
