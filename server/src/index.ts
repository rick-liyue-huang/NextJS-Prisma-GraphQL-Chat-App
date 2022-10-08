import { makeExecutableSchema } from '@graphql-tools/schema';
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import * as dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import { getSession } from 'next-auth/react';
import { GraphQLContext } from '../config/types';
import { resolvers } from './graphql/resolvers';
import { typeDefs } from './graphql/typeDefs';

async function startApolloServer() {
  dotenv.config();
  const app = express();
  const httpServer = http.createServer(app);
  const schema = makeExecutableSchema({ typeDefs, resolvers }); // have to use lodash to merge the parameters and match with schema

  const corsOptions = {
    origin: process.env.CLIENT_ORIGIN_URI,
    credentials: true, // can access the next auth user session
  };

  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
    /**
     * send the session from client to server
     * @param param0 request from client by using next-auth
     */
    context: async ({ req, res }): Promise<GraphQLContext> => {
      const session = await getSession({ req }); // need node18
      // console.log('session from client: ', session);

      return {
        session: session,
      };
    },
  });
  await server.start();
  server.applyMiddleware({ app, cors: corsOptions });
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer().catch((err) => console.log(err));
