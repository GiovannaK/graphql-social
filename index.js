const {ApolloServer} = require('apollo-server');
const connectDB = require('./config/database');
const resolvers = require('./graphql/resolvers');
const dotenv = require('dotenv').config();
const typeDefs = require('./graphql/typeDefs');


connectDB();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => ({req})
});

server.listen({port: 5000}).then(res => console.log(`Server running at ${res.url}`))