import type { NextPage, NextPageContext } from 'next';
import { getSession, signIn, signOut, useSession } from 'next-auth/react';

const Home: NextPage = () => {
  const { data } = useSession();
  // after I click the button, it will create the new user and store it in mongoDB, because in pages/api/auth/[...nextauth].ts, it has PrismaAdapter(prisma), used to connect with mongoDB by 'schema.prisma'
  console.log('session: ', data);

  return (
    <div>
      {data?.user ? (
        <button onClick={() => signOut()}>Sign Out</button>
      ) : (
        <button onClick={() => signIn('google')}>Sign In</button>
      )}
      {data?.user?.name}
    </div>
  );
};

// by running this, we can get the data from server directly when refreshing page
export async function getServerSideProps(context: NextPageContext) {
  const seesion = await getSession(context);
  return {
    props: {
      session: seesion,
    },
  };
}

export default Home;
