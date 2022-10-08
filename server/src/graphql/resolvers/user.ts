export const userResolvers = {
  Query: {
    searchUsers: () => {},
  },
  Mutation: {
    createUsername: (
      parent: any,
      { username }: { username: string },
      context: any
    ) => {
      // console.log('username: ', username);
      // communicate with mongodb
      console.log('here is context: ', context);
    },
  },
};
