const { ApolloServer} = require("apollo-server")
const { typeDefs, resolvers } = require("./src/graphql")
const { makeExecutableSchema } = require('@graphql-tools/schema');

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  formatError: err => {
    if(err.message.startsWith(`Usuário existente:`)){
      return new Error(err.message)
    }
  }
});

const server = new ApolloServer({schema});

server.listen(4001).then(({url})=> console.log(url))

