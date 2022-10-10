import { Box, Text } from '@chakra-ui/react';
import { Session } from 'next-auth';
import React, { useState } from 'react';
import { ConversationModal } from './Modal/Modal';

interface Props {
  session: Session;
}

export const ConversationList: React.FC<Props> = ({ session }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  return (
    <Box width={'100%'}>
      <Box
        py={2}
        px={4}
        mb={4}
        bg="blackAlpha.300"
        borderRadius={4}
        cursor="pointer"
        onClick={handleOpen}
      >
        <Text textAlign={'center'} color="whiteAlpha.700" fontWeight={500}>
          Find or start a conversation
        </Text>
      </Box>
      <ConversationModal isOpen={isOpen} onClose={handleClose} />
    </Box>
  );
};
