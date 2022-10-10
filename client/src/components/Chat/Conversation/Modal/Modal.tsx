import { useLazyQuery } from '@apollo/client';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
} from '@chakra-ui/react';
import React, { FormEvent, useState } from 'react';
import {
  SearchUsersPayload,
  SearchUsersVariable,
} from '../../../../config/types';
import { UserOperations } from '../../../../graphql/operations/user';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const ConversationModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState('');
  const [searchUsers, { data, loading, error }] = useLazyQuery<
    SearchUsersPayload,
    SearchUsersVariable
  >(UserOperations.Queries.searchUsers);

  const handleSearch = (e: FormEvent) => {
    // using graphql query to search username
    e.preventDefault();
    console.log(username);
    searchUsers({
      variables: {
        username: username,
      },
    });
  };

  console.log('searchedUser: ', data);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="#eee" pb={4}>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSearch}>
              <Stack spacing={4}>
                <Input
                  placeholder="Enter a username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Button type="submit" disabled={!username} isLoading={loading}>
                  Search
                </Button>
              </Stack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
