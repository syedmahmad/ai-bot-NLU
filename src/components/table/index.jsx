import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Box,
  Button,
  Heading,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  List,
  ListItem,
  Divider,
  useDisclosure,
} from '@chakra-ui/react';
import axios from 'axios';
import { Icon } from '@iconify/react';
import CreateFlowModal from '../Modals/createFlowModal';
import { useQuery } from '@tanstack/react-query';
import EditFlowModal from '../Modals/editFlowModal';
import { useState } from 'react';

function TableComponent() {
  const [selectedItem, setSelectedItem] = useState(null);
  const {
    isOpen: createFlowOpen,
    onOpen: createFlowOnOpen,
    onClose: createFlowOnClose,
  } = useDisclosure();
  const { data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      axios.get('http://54.81.9.89/flow_entity/').then((res) => res.data),
  });

  const {
    isOpen: editModalOpen,
    onOpen: editModalOnOpen,
    onClose: editModalOnClose,
  } = useDisclosure();

  return (
    <>
      <CreateFlowModal
          isOpen={createFlowOpen}
          onClose={createFlowOnClose}
      />

      <EditFlowModal
          isOpen={editModalOpen}
          onClose={editModalOnClose}
          selectedItem={selectedItem}
      />

      <Box
          padding="104px 28px"
          width="100%"
      >
        <Heading
            fontFamily="Inter"
            fontSize="lg"
            fontWeight={400}
            marginLeft="48px"
        >
          Flows
        </Heading>

        <br />

        <Box>
          <TableContainer
              border="0.5px solid"
              borderColor="stroke.table"
              borderRadius="0.625rem 0.625rem 0rem 0rem"
              width="100%"
          >
            <Table variant="simple">
              <Thead backgroundColor="background.tableHead">
                <Tr>
                  <Th
                      color="text.tableHeading"
                      fontFamily="Inter"
                      fontSize="lg"
                      fontStyle="normal"
                      fontWeight={400}
                      lineHeight="normal"
                      textTransform="none"
                  >
                    Flow Name
                  </Th>

                  <Th
                      color="text.tableHeading"
                      fontFamily="Inter"
                      fontSize="lg"
                      fontStyle="normal"
                      fontWeight={400}
                      lineHeight="normal"
                      textTransform="none"
                  >
                    Flow Description
                  </Th>

                  <Th
                      color="text.tableHeading"
                      fontFamily="Inter"
                      fontSize="lg"
                      fontStyle="normal"
                      fontWeight={400}
                      lineHeight="normal"
                      textTransform="none"
                  >
                    Last Edited on
                  </Th>

                  <Th
                      color="text.tableHeading"
                      fontFamily="Inter"
                      fontSize="lg"
                      fontStyle="normal"
                      fontWeight={400}
                      lineHeight="normal"
                      textTransform="none"
                  >
                    Created at
                  </Th>

                  <Th
                      display="flex"
                      justifyContent="right"
                  >
                    <Button
                        _hover={{ backgroundColor: 'primary.90' }}
                        backgroundColor="primary.100"
                        borderRadius="0.25rem"
                        color="white"
                        height="1.75rem"
                        onClick={createFlowOnOpen}
                        width="7.375rem"
                    >
                      Create Flow
                    </Button>
                  </Th>
                </Tr>
              </Thead>

              <Tbody>
                {data?.length > 0 &&
                  data?.map((item) => {
                    const date_update_at = new Date(item.audit.updated_at);
                    const date_created_at = new Date(item.audit.created_at);
                    const options = {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    };
                    return (
                      <Tr
                          backgroundColor="white"
                          height="3.125rem"
                          key={item._id}
                      >
                        <Td
                            color="text.body"
                            fontSize="md"
                            height="3.125rem"
                        >
                          {item.name}
                        </Td>

                        <Td
                            color="text.body"
                            fontSize="md"
                            height="3.125rem"
                        >
                          {item.description}
                        </Td>

                        <Td
                            color="text.body"
                            fontSize="md"
                            height="3.125rem"
                        >
                          {date_update_at.toLocaleDateString('en-US', options)}
                        </Td>

                        <Td
                            color="text.body"
                            fontSize="md"
                            height="3.125rem"
                        >
                          {date_created_at.toLocaleDateString('en-US', options)}
                        </Td>

                        <Td
                            alignItems="center"
                            height="3.125rem"
                        >
                          <Popover placement="bottom-end">
                            <Box
                                cursor="pointer"
                                display="flex"
                                justifyContent="right"
                            >
                              <PopoverTrigger>
                                <Icon
                                    height="1.375rem"
                                    icon="ph:dots-three-outline-vertical-fill"
                                    width="1.375rem"
                                />
                              </PopoverTrigger>
                            </Box>

                            <PopoverContent width="6.8125rem">
                              <PopoverBody>
                                <List spacing={3}>
                                  <ListItem
                                      cursor="pointer"
                                      onClick={() => {
                                      console.log(item);
                                      setSelectedItem(item), editModalOnOpen();
                                    }}
                                  >
                                    Edit
                                  </ListItem>

                                  <Divider />

                                  <ListItem cursor="pointer">
                                    Delete
                                  </ListItem>

                                  <Divider />

                                  <ListItem cursor="pointer">
                                    Duplicate
                                  </ListItem>
                                </List>
                              </PopoverBody>
                            </PopoverContent>
                          </Popover>
                        </Td>
                      </Tr>
                    );
                  })}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
}

export default TableComponent;
