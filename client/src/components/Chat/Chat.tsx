import { Button } from '@chakra-ui/react';
import { signOut } from 'next-auth/react';
import React from 'react';

interface ChatProps {}

export const ChatComponent: React.FC<ChatProps> = () => {
  return (
    <div>
      <Button onClick={() => signOut()}>Logout</Button>
    </div>
  );
};
