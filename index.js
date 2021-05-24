const {ApolloServer, PubSub} = require('apollo-server');
const connectDB = require('./config/database');
const resolvers = require('./graphql/resolvers');
const dotenv = require('dotenv').config();
const typeDefs = require('./graphql/typeDefs');

const pubsub = new PubSub();

connectDB();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => ({req, pubsub})
});

server.listen({port: 5000}).then(res => console.log(`Server running at ${res.url}`))