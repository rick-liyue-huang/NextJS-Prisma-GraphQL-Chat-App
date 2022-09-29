import { Box } from '@chakra-ui/react';
import type { NextPage, NextPageContext } from 'next';
import { getSession, useSession } from 'next-auth/react';
import { Auth } from '../components/Auth/Auth';
import { ChatComponent } from '../components/Chat/Chat';

const Home: NextPage = () => {
  const { data: session } = useSession();

  console.log('here is data: --', session);

  const handleReloadSession = () => {};

  return (
    <Box>
      {session?.user?.username ? (
        <ChatComponent />
      ) : (
        <Auth session={session} reloadSession={handleReloadSession} />
      )}
    </Box>
  );
};

// here add getSession to avoid no user info when refresh page
export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}

export default Home;

/**
 * 
 * <div>
      {data?.user ? (
        <button onClick={() => signOut()}>Sign Out</button>
      ) : (
        <button onClick={() => signIn('google')}>Sign In</button>
      )}

      {data?.user?.name}
    </div>
 */
