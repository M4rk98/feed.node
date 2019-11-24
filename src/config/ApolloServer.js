import {ApolloServer} from "apollo-server-express";
import schema from "../schema";
import resolvers from "../resolvers";
import ApolloContext from "./ApolloContext";

const server = new ApolloServer({
    introspection: true,
    playground: true,
    typeDefs: schema,
    resolvers,
    context: ApolloContext
});

export default server;