import http from 'http';
import {sequelize} from './model';
import ApolloServer from "./config/ApolloServer";
import app from "./config/App";

ApolloServer.applyMiddleware({ app, path: '/graphql' });

const httpServer = http.createServer(app);
const port = process.env.PORT || 8000;

sequelize.sync().then(async () => {
    httpServer.listen({ port }, () => {
        console.log(`Apollo Server on http://localhost:${port}/graphql`);
    });
});