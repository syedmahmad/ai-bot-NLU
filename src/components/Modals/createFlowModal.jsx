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
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';

const CreateFlowModal = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const mutation = useMutation({
    mutationFn: (data) => {
      return axios.post('http://54.81.9.89/flow_entity/', data);
    },
  });

  const createFlow = () => {
    if (name === '' || description === '') {
      toast.error('Both flow name and description fields are required');
      onClose();
    } else {
      mutation.mutate(
        { name: name, description: description },
        {
          onSuccess: (response) => {
            console.log('response', response);
            toast.success('Flow added successfully');
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
        <ModalHeader>Create Flow</ModalHeader>
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
            required
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
            required
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
                onClick={createFlow}
              >
                Create Flow
              </Button>
            </GridItem>
          </Grid>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CreateFlowModal;
