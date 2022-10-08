export interface CreateUsernamePayload {
  createUsername: {
    success: boolean;
    error: string;
  };
}

export interface CreateUsernameVariable {
  username: string;
}
