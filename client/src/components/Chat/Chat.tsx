import { Button } from '@chakra-ui/react';
import { signOut } from 'next-auth/react';
import React from 'react';

interface Props {}

export const ChatComponent: React.FC<Props> = () => {
  return (
    <div>
      <Button onClick={() => signOut()}>Sign Out</Button>
    </div>
  );
};
