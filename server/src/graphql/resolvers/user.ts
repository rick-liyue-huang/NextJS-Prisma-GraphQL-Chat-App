import { CreateUsernamePayload, GraphQLContext } from '../../config/types';

export const userResolvers = {
  Query: {
    searchUsers: () => {},
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
