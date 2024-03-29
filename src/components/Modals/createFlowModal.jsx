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
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function CreateFlowModal({ isOpen, onClose }) {
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const [description, setDescription] = useState('');

  const mutation = useMutation({
    mutationFn: (data) => {
      return axios.post(`${import.meta.env.VITE_API_URL}/flow_document/`, data);
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
          onSuccess: async (response) => {
            navigate(`/flow/${response?.data?.id}`)
            toast.success(response.data.detail);
            setName('');
            setDescription('');
            onClose();
          },
        },
      );
    }
  };

  return (
    <Modal
        isOpen={isOpen}
        onClose={onClose}
    >
      <ModalOverlay />

      <ModalContent
          alignSelf="center"
          display="flex"
          padding="0px"
      >
        <ModalHeader>
          Create Flow
        </ModalHeader>

        <ModalBody>
          <Text
              color="text.body"
              fontSize="xs"
              fontWeight={400}
              margin="5px 0px"
          >
            Flow Name
          </Text>

          <Input
              _placeholder={{
              color: 'text.body',
              fontSize: 'xs',
              fontWeight: 400,
            }}
              border="0.5px solid"
              borderColor="stroke.table"
              borderRadius="0.3125rem"
              height="2rem"
              onChange={(event) => setName(event.target.value)}
              placeholder="Account Balance"
              required
              value={name}
          />

          <br />

          <br />

          <Text
              color="text.body"
              fontSize="xs"
              fontWeight={400}
              margin="5px 0px"
          >
            Flow Description
          </Text>

          <Textarea
              _placeholder={{
              color: 'text.body',
              fontSize: 'xs',
              fontWeight: 400,
            }}
              border="0.5px solid"
              borderColor="stroke.table"
              borderRadius="0.3125rem"
              height="2rem"
              onChange={(event) => setDescription(event.target.value)}
              required
              value={description}
          />

          <br />

          <br />

          <Grid
              gap={2}
              templateColumns="repeat(3, 1fr)"
          >
            <GridItem
                h="10"
                w="100%"
            />

            <GridItem
                h="10"
                w="100%"
            >
              <Button
                  borderColor="primary.100"
                  color="primary.100"
                  onClick={onClose}
                  size="sm"
                  variant="outline"
                  width="100%"
              >
                Cancel
              </Button>
            </GridItem>

            <GridItem
                h="10"
                w="100%"
            >
              <Button
                  _hover={{ backgroundColor: 'primary.90' }}
                  backgroundColor="primary.100"
                  color="white"
                  onClick={createFlow}
                  size="sm"
                  width="100%"
              >
                Create Flow
              </Button>
            </GridItem>
          </Grid>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default CreateFlowModal;
