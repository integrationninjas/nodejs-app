const express = require("express");
const app = express();
const PORT = 5000;
const userData = require("./MOCK_DATA.json");
const graphql = require("graphql")
const { GraphQLObjectType, GraphQLSchema, GraphQLList, GraphQLID, GraphQLInt, GraphQLString } = graphql
const { graphqlHTTP } = require("express-graphql")

const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: { type: GraphQLInt },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
    })
})

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        getAllUsers: {
            type: new GraphQLList(UserType),
            args: { id: {type: GraphQLInt}},
            resolve(parent, args) {
                return userData;
            }
        },
        findUserById: {
            type: UserType,
            description: "fetch single user",
            args: { id: {type: GraphQLInt}},
            resolve(parent, args) {
                return userData.find((a) => a.id == args.id);
            }
        }
    }
})
const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        createUser: {
            type: UserType,
            args: {
                firstName: {type: GraphQLString},
                lastName: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString },
            },
            resolve(parent, args) {
                userData.push({
                    id: userData.length + 1,
                    firstName: args.firstName,
                    lastName: args.lastName,
                    email: args.email,
                    password: args.password
                })
                return args
            }
        }
    }
})

const schema = new GraphQLSchema({query: RootQuery, mutation: Mutation})
app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.get("/rest/getAllUsers", (req, res) => {
    res.send(userData)
   });

app.listen(PORT, () => {
  console.log("Server running");
});