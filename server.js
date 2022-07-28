const { ApolloServer} = require("apollo-server")
const { typeDefs, resolvers } = require("./src/graphql")
const { makeExecutableSchema } = require('@graphql-tools/schema');

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const server = new ApolloServer({schema});

server.listen(4001).then(({url})=> console.log(url))