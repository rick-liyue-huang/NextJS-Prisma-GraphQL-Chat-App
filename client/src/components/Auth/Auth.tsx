import { Button, Center, Image, Input, Stack, Text } from '@chakra-ui/react';
import { Session } from 'next-auth';
import { signIn } from 'next-auth/react';
import React, { useState } from 'react';

interface Props {
  session: Session | null;
  reloadSession: () => void;
}

export const AuthComponent: React.FC<Props> = ({ session, reloadSession }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = async () => {
    // graphql coding here
    try {
      // graphql coding mutation here
    } catch (err) {
      console.log('handleSubmit err: ', err);
    }
  };

  return (
    <div>
      <Center height={'100vh'} border="1px solid red">
        <Stack align={'center'} spacing={8}>
          {session ? (
            <>
              <Text fontSize={'3xl'}>Create one User</Text>
              <Input
                placeholder="Enter one user"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Button width={'100%'} onClick={handleSubmit}>
                Save
              </Button>
            </>
          ) : (
            <>
              <Text fontSize={'3xl'}>Messager</Text>
              <Button
                onClick={() => signIn('google')}
                leftIcon={<Image height="20px" src="/images/googlelogo.png" />}
              >
                Continue with Google
              </Button>
            </>
          )}
        </Stack>
      </Center>
    </div>
  );
};
