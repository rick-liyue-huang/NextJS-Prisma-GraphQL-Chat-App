import { Button, Flex } from '@chakra-ui/react';
import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import React from 'react';
import { ConversationWrap } from './Conversation/ConversationWrap';
import { FeedWrap } from './Feed/FeedWrap';

interface Props {
  session: Session;
}

export const ChatComponent: React.FC<Props> = ({ session }) => {
  return (
    <Flex height={'100vh'}>
      <ConversationWrap session={session} />
      <FeedWrap session={session} />
      <Button onClick={() => signOut()}>Sign Out</Button>
    </Flex>
  );
};
