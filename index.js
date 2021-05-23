const {ApolloServer} = require('apollo-server');
const gql = require('graphql-tag');
const connectDB = require('./config/database');
const dotenv = require('dotenv').config();

const typeDefs = gql`
    type Query{
        sayHi: String!
    } 
`

const resolvers = {
    Query: {
        sayHi: () => 'Hello World'
    }
}

connectDB();

const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.listen({port: 5000}).then(res => console.log(`Server running at ${res.url}`))