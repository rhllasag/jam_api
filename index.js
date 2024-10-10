var express = require('express');
var express_graphql = require('express-graphql');
var { buildSchema } = require('graphql');
// GraphQL schema

var schema = buildSchema(`
    type Query {
    message: String
    }
`);

// Root resolver
var root = {
message: () => 'Hello World!'
};

// Create an express server and a GraphQL endpoint
var app = express();
app.use('/graphql', express_graphql.graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}),);

// To see in postman
var { ruruHTML } = require("ruru/server")
 
// Serve the GraphiQL IDE.
app.get("/", (_req, res) => {
  res.type("html")
  res.end(ruruHTML({ endpoint: "/graphql" }))
})

app.listen(8080, () => console.log('Express GraphQL Server Now Running On http://localhost:8080/graphql'));