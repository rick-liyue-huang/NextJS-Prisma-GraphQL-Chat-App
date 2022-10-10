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
  SeachUserType,
  SearchUsersPayload,
  SearchUsersVariable,
} from '../../../../config/types';
import { UserOperations } from '../../../../graphql/operations/user';
import { Participants } from './Participants';
import { UserSearchList } from './UserSearchList';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const ConversationModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState('');
  const [participants, setParticipants] = useState<SeachUserType[]>([]);

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

  const handleAddParticipant = (user: SeachUserType) => {
    setParticipants((prev) => [...prev, user]);
    setUsername('');
  };

  const handleRemoveParticipant = (userId: string) => {
    setParticipants((prev) => prev.filter((p) => p.id !== userId));
  };

  // console.log('searchedUser: ', data);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="#eee" pb={4}>
          <ModalHeader>Create on Conversation</ModalHeader>
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
            {data?.searchUsers && (
              <UserSearchList
                users={data?.searchUsers}
                handleAddParticipant={handleAddParticipant}
              />
            )}
            {participants.length !== 0 && (
              <Participants
                participants={participants}
                handleRemoveParticipant={handleRemoveParticipant}
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
