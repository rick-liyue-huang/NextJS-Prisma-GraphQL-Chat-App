import { User } from '@prisma/client';
import { ApolloError } from 'apollo-server-core';
import { CreateUsernamePayload, GraphQLContext } from '../../config/types';

export const userResolvers = {
  Query: {
    searchUsers: async (
      parent: any,
      { username: searchedUsername }: { username: string },
      { session, prisma }: GraphQLContext
    ): Promise<Array<User>> => {
      if (!session?.user) {
        throw new ApolloError('not authorized');
      }
      const {
        user: { username: myMyusername },
      } = session;

      try {
        const users = await prisma.user.findMany({
          where: {
            username: {
              contains: searchedUsername,
              not: myMyusername,
              mode: 'insensitive',
            },
          },
        });
        return users;
      } catch (err: any) {
        console.log('SearchUsers error: ', err);
        throw new ApolloError(err?.message);
      }
    },
  },
  Mutation: {
    createUsername: async (
      parent: any,
      { username }: { username: string },
      { session, prisma }: GraphQLContext
    ): Promise<CreateUsernamePayload> => {
      // console.log('username: ', username);
      // communicate with mongodb
      // console.log('here is context: ', );

      if (!session?.user) {
        return {
          error: 'Not Authorized',
        };
      }
      const { id: userId } = session.user;

      try {
        // check username is not taken
        const existingUser = await prisma.user.findUnique({
          where: {
            username: username, // add username on schema.prisma, and generate again
          },
        });

        if (existingUser) {
          return {
            error: 'Username already taken, try another',
          };
        }

        // update user db
        await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            username: username,
          },
        });

        return { success: true };
      } catch (err: any) {
        console.log('create username error: ', err);
        return {
          error: err.message,
        };
      }
    },
  },
};
