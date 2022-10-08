import { PrismaClient } from '@prisma/client';
import { ISODateString } from 'next-auth';

export interface GraphQLContext {
  session: ISession | null; // also need to extend the Session from default one on 'lib/next-aut.d.ts'
  // prisma
  prisma: PrismaClient;
}

// User
export interface CreateUsernamePayload {
  success?: boolean;
  error?: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  image: string;
  name: string;
  emailVerified: boolean;
}

export interface ISession {
  user?: User;
  expires: ISODateString;
}
