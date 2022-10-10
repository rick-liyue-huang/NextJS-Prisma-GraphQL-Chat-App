export interface CreateUsernamePayload {
  createUsername: {
    success: boolean;
    error: string;
  };
}

export interface CreateUsernameVariable {
  username: string;
}

export interface SearchUsersVariable {
  username: string;
}

export interface SearchUsersPayload {
  searchUsers: Array<SeachUserType>;
}

export interface SeachUserType {
  id: string;
  username: string;
}
