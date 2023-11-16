import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Input,
  Textarea,
  Grid,
  GridItem,
  Button,
  Text,
} from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useState } from 'react';

const EditFlowModal = ({ isOpen, onClose, selectedItem }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const mutation = useMutation({
    mutationFn: (data) => {
      return axios.put(
        `http://54.81.9.89/flow_entity/{id}?_id=${selectedItem._id}`,
        data,
      );
    },
  });

  const editFlow = () => {
    if (name === '' && description === '') {
      toast.error('flow name or description field is required');
      onClose();
    } else {
      mutation.mutate(
        { _id: selectedItem._id, name: name, description: description },
        {
          onSuccess: (response) => {
            console.log('response', response);
            toast.success('Flow Edited successfully');
            setName('');
            setDescription('');
            onClose();
          },
        },
      );
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent padding={'32px 0px'} display={'flex'} alignSelf={'center'}>
        <ModalHeader>Edit Flow</ModalHeader>
        <ModalBody>
          <Text
            color={'text.body'}
            fontSize={'xs'}
            fontWeight={400}
            margin={'5px 0px'}
          >
            Flow Name
          </Text>
          <Input
            height={'2rem'}
            borderRadius={'0.3125rem'}
            border={'0.5px solid'}
            borderColor={'stroke.table'}
            placeholder="Account Balance"
            _placeholder={{
              color: 'text.body',
              fontSize: 'xs',
              fontWeight: 400,
            }}
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <br />
          <br />
          <Text
            color={'text.body'}
            fontSize={'xs'}
            fontWeight={400}
            margin={'5px 0px'}
          >
            Flow Description
          </Text>
          <Textarea
            height={'2rem'}
            borderRadius={'0.3125rem'}
            border={'0.5px solid'}
            borderColor={'stroke.table'}
            _placeholder={{
              color: 'text.body',
              fontSize: 'xs',
              fontWeight: 400,
            }}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <br />
          <br />
          <Grid templateColumns="repeat(3, 1fr)" gap={6}>
            <GridItem w="100%" h="10" />
            <GridItem w="100%" h="10">
              <Button
                variant={'outline'}
                color={'primary.100'}
                borderColor="primary.100"
                size="sm"
                width={'100%'}
                onClick={onClose}
              >
                Cancel
              </Button>
            </GridItem>
            <GridItem w="100%" h="10">
              <Button
                color={'white'}
                backgroundColor="primary.100"
                size="sm"
                width={'100%'}
                _hover={{ backgroundColor: 'primary.90' }}
                onClick={editFlow}
              >
                Edit Flow
              </Button>
            </GridItem>
          </Grid>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EditFlowModal;
