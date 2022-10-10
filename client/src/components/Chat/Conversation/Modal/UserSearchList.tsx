import { Avatar, Button, Flex, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { SeachUserType } from '../../../../config/types';

interface Props {
  users: Array<SeachUserType>;
  handleAddParticipant: (user: SeachUserType) => void;
}

export const UserSearchList: React.FC<Props> = ({
  users,
  handleAddParticipant,
}) => {
  return (
    <>
      {users.length === 0 ? (
        <Flex mt={6} justify="center">
          <Text>No User found</Text>
        </Flex>
      ) : (
        <Stack mt={6}>
          {users.map((user) => (
            <Stack
              key={user.id}
              direction="row"
              align={'center'}
              spacing={4}
              py={2}
              px={4}
              borderRadius={4}
              _hover={{ bg: 'whiteAlpha.200' }}
            >
              <Avatar src="" />
              <Flex justify={'space-between'} width="100%" align={'center'}>
                <Text color="blackAlpha.700">{user.username}</Text>
                <Button
                  bg="brand.100"
                  _hover={{ bg: 'steelblue' }}
                  onClick={() => handleAddParticipant(user)}
                >
                  Select
                </Button>
              </Flex>
            </Stack>
          ))}
        </Stack>
      )}
    </>
  );
};
