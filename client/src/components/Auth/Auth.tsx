import { useMutation } from '@apollo/client';
import { Button, Center, Image, Input, Stack, Text } from '@chakra-ui/react';
import { Session } from 'next-auth';
import { signIn } from 'next-auth/react';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import {
  CreateUsernamePayload,
  CreateUsernameVariable,
} from '../../config/types';
import { UserOperations } from '../../graphql/operations/user';

interface Props {
  session: Session | null;
  reloadSession: () => void;
}

export const AuthComponent: React.FC<Props> = ({ session, reloadSession }) => {
  const [username, setUsername] = useState('');

  /**
   * need to confirm the Type in useMutation, and the order of the type
   */
  const [createUsername, { /*data, */ error, loading }] = useMutation<
    CreateUsernamePayload,
    CreateUsernameVariable
  >(UserOperations.Mutations.createUsername);

  // console.log('here is data: ---', data, error, loading);

  const handleSubmit = async () => {
    if (!username) return;
    // graphql coding here
    try {
      // graphql coding mutation here
      const { data } = await createUsername({
        variables: { username: username },
      }); // same as the upper data in useMutation

      if (!data?.createUsername) {
        throw new Error();
      }

      if (data.createUsername.error) {
        const {
          createUsername: { error },
        } = data;
        throw new Error(error);
      }

      toast.success('Username created successfully');

      // reload session to obtain new username
      reloadSession();

      // reload
    } catch (err: any) {
      console.log('handleSubmit err: ', err);
      toast.error(err?.message);
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
              <Button width={'100%'} onClick={handleSubmit} isLoading={loading}>
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
