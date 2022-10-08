// merge the orignal next-auth.d.ts

/**
 * export interface DefaultSession extends Record<string, unknown> {
    user?: {
        name?: string | null;
        email?: string | null;
        image?: string | null;
    };
    expires: ISODateString;
}
 */

import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: User;
  }
  interface User {
    id: string;
    username: string;
    image: string;
  }
}
