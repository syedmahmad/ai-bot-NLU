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

function EditFlowModal({ isOpen, onClose, selectedItem, setSelectedItem, fetchData }) {
  const [name, setName] = useState(selectedItem?.name);
  const [description, setDescription] = useState(selectedItem?.description);

  const mutation = useMutation({
    mutationFn: (data) => {
      return axios.put(
        `${import.meta.env.VITE_API_URL}/flow_document/${data.id}`,
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
        { id: selectedItem.id, name: name, 
          description: description, 
          edges: selectedItem?.edges, 
          nodes: selectedItem?.nodes 
        },
        {
          onSuccess: async () => {
            fetchData();
            toast.success("Flow edited successfully");
            setSelectedItem(null);
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
        onClose={() => {setSelectedItem(null), onClose()}}
    >
      <ModalOverlay />

      <ModalContent
          alignSelf="center"
          display="flex"
          padding="0px"
      >
        <ModalHeader>
          Edit Flow
        </ModalHeader>

        <ModalBody>
          <Text
              color="text.body"
              fontSize="md"
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
              value={name}
          />

          <br />

          <br />

          <Text
              color="text.body"
              fontSize="md"
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
                  onClick={editFlow}
                  size="sm"
                  width="100%"
              >
                Save
              </Button>
            </GridItem>
          </Grid>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default EditFlowModal;
