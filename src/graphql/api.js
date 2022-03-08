const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const { makeExecutableSchema } = require('@graphql-tools/schema');

const resolvers = require('./resolving');
const typeDefs = require('./typing');

const schema = makeExecutableSchema({ typeDefs, resolvers });

const createAPI = (httpServer) => {
  return new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({httpServer})],
  });
};

module.exports = createAPI;