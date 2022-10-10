import { Box } from '@chakra-ui/react';
import { Session } from 'next-auth';
import React from 'react';
import { ConversationList } from './ConversationList';

interface Props {
  session: Session;
}

export const ConversationWrap: React.FC<Props> = ({ session }) => {
  return (
    <Box
      width={{ base: '100%', md: '400px' }}
      border="1px solid red"
      py={6}
      px={3}
    >
      {/* <Skeleton></Skeleton> */}
      <ConversationList session={session} />
    </Box>
  );
};
