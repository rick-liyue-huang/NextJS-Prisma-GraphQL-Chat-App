import type { NextPage } from 'next';
import { signIn, useSession } from 'next-auth/react';

const Home: NextPage = () => {
  const { data: session } = useSession();
  // after I click the button, it will create the new user and store it in mongoDB, because in pages/api/auth/[...nextauth].ts, it has PrismaAdapter(prisma), used to connect with mongoDB by 'schema.prisma'
  console.log('session: ', session);

  return (
    <div>
      <button onClick={() => signIn('google')}>Sign In</button>
    </div>
  );
};

export default Home;
