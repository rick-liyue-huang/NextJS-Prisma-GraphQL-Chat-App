import { gql } from 'apollo-server-core';

export const userTypeDefs = gql`
  type SearchedUser {
    id: String
    username: String
  }

  type Query {
    searchUsers(username: String): [SearchedUser]
  }

  type Mutation {
    createUsername(username: String): CreateUsernameResponse
  }

  type CreateUsernameResponse {
    success: Boolean
    error: String
  }
`;
