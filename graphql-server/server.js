const { ApolloServer} = require("apollo-server")
const { typeDefs, resolvers } = require("./src/graphql")
const { makeExecutableSchema } = require('@graphql-tools/schema');

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const server = new ApolloServer({
  schema,
  formatError: (err) => {
    if(err.message.startsWith(`Usuário existente:`)){
      return new Error(err.message)
    }
    return err
  }
});

server.listen(4001).then(({url})=> console.log(url))

