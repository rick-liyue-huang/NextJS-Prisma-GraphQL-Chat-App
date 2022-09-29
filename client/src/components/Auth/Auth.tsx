import { Button, Center, Image, Input, Stack, Text } from '@chakra-ui/react';
import { Session } from 'next-auth';
import { signIn } from 'next-auth/react';
import React, { useState } from 'react';

interface AuthProps {
  session: Session | null;
  reloadSession: () => void; // refetch
}

export const Auth: React.FC<AuthProps> = ({ session, reloadSession }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = async () => {
    // graphql mutation here
    try {
      // createUsername mutation to send username to GraphQL api
    } catch (err) {
      console.log('handleSubmit - Auth.tsx --- ', err);
    }
  };

  return (
    <Center height={'100vh'} border={'1px solid red'}>
      <Stack align={'center'} spacing={6}>
        {session ? (
          <>
            <Text fontSize={'3xl'}>create one user</Text>
            <Input
              placeholder="enter a username please..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Button width="100%" onClick={handleSubmit}>
              Save
            </Button>
          </>
        ) : (
          <>
            <Text fontSize={'3xl'}>Message</Text>
            <Button
              leftIcon={
                <Image
                  height={'20px'}
                  width="20px"
                  src="/images/googlelogo.png"
                />
              }
              onClick={() => signIn('google')}
            >
              Continue with Google
            </Button>
          </>
        )}
      </Stack>
    </Center>
  );
};
