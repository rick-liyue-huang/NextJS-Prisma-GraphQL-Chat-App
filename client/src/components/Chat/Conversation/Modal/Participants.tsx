import { Flex, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { SeachUserType } from '../../../../config/types';

interface Props {
  participants: SeachUserType[];
  handleRemoveParticipant: (userId: string) => void;
}

export const Participants: React.FC<Props> = ({
  participants,
  handleRemoveParticipant,
}) => {
  return (
    <Flex mt={8} gap={'10px'} flexWrap="wrap">
      {participants.map((participant) => (
        <Stack
          direction={'row'}
          key={participant.id}
          align="center"
          bg="whiteAlpha.300"
          borderRadius={4}
          p={2}
        >
          <Text>{participant.username}</Text>
          <IoIosCloseCircleOutline
            size={20}
            cursor="pointer"
            onClick={() => handleRemoveParticipant(participant.id)}
          />
        </Stack>
      ))}
    </Flex>
  );
};
