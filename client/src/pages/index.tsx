import { Box } from '@chakra-ui/react';
import type { NextPage, NextPageContext } from 'next';
import { getSession, useSession } from 'next-auth/react';
import { AuthComponent } from '../components/Auth/Auth';
import { ChatComponent } from '../components/Chat/Chat';

const Home: NextPage = () => {
  const { data: session } = useSession();
  // after I click the button, it will create the new user and store it in mongoDB, because in pages/api/auth/[...nextauth].ts, it has PrismaAdapter(prisma), used to connect with mongoDB by 'schema.prisma'
  console.log('session: ', session);

  const handleReloadSession = () => {};

  return (
    <div>
      <Box>
        {session?.user.username ? (
          <ChatComponent />
        ) : (
          <AuthComponent
            session={session}
            reloadSession={handleReloadSession}
          />
        )}
      </Box>
    </div>
  );
};

// by running this, we can get the data from server directly when refreshing page
// You should use getServerSideProps only if you need to render a page whose data must be fetched at request time. This could be due to the nature of the data or properties of the request (such as authorization headers or geo location).
export async function getServerSideProps(context: NextPageContext) {
  const seesion = await getSession(context);
  return {
    props: {
      session: seesion,
    },
  };
}

export default Home;

/**
 * Note: business logic:
 * 1. session?.user.username is null
 * 2. enter AuthComponent
 * 3. session is null, so need to login with google
 * 4. and then go back to username input part in 'AuthComponent'
 * 5. after graphql mutation to create username
 * 6. session?.user.username get value
 * 7. enter the ChatComponent
 */
