import 'next-auth';

// custom define the Session type

// from default Session
declare module 'next-auth' {
  interface Session {
    user: User;
  }
  interface User {
    id: string;
    username: string;
  }
}
