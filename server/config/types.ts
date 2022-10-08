import { Session } from 'next-auth';

export interface GraphQLContext {
  session: Session | null; // also need to extend the Session from default one on 'lib/next-aut.d.ts'
  // prisma
}
