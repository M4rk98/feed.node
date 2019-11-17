import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import http from 'http';
import {
    ApolloServer,
} from 'apollo-server-express';
import loaders from './loaders'
import schema from './schema';
import resolvers from './resolvers';
import models, { sequelize } from './model';
import DataLoader from "dataloader";

const app = express();

app.use(cors());
app.use(morgan('dev'));

const server = new ApolloServer({
    introspection: true,
    playground: true,
    typeDefs: schema,
    resolvers,
    formatError: error => {
        // remove the internal sequelize error message
        // leave only the important validation error
        const message = '';
        return {
            ...error,
            message,
        };
    },
    context: async () => {
        return {
            models,
            loaders: {
                user: new DataLoader(keys =>
                    loaders.user.batchUsers(keys, models),
                ),
            },
        }
    }
   });

server.applyMiddleware({ app, path: '/graphql' });
const httpServer = http.createServer(app);

const isTest = !!process.env.TEST_DATABASE;
const isProduction = !!process.env.DATABASE_URL;
const port = process.env.PORT || 8000;

sequelize.sync({ force: isTest || isProduction }).then(async () => {

    httpServer.listen({ port }, () => {

        console.log(`Apollo Server on http://localhost:${port}/graphql`);
    });
});