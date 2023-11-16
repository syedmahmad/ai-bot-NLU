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

const TableComponent = () => {
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
      <CreateFlowModal isOpen={createFlowOpen} onClose={createFlowOnClose} />
      <EditFlowModal
        selectedItem={selectedItem}
        isOpen={editModalOpen}
        onClose={editModalOnClose}
      />
      <Box width="100%" padding="104px 28px">
        <Heading
          marginLeft={'48px'}
          fontFamily={'Inter'}
          fontSize={'lg'}
          fontWeight={400}
        >
          Flows
        </Heading>
        <br />
        <Box>
          <TableContainer
            width={'100%'}
            borderRadius={'0.625rem 0.625rem 0rem 0rem'}
            border={'0.5px solid'}
            borderColor={'stroke.table'}
          >
            <Table variant="simple">
              <Thead backgroundColor={'background.tableHead'}>
                <Tr>
                  <Th
                    color={'text.tableHeading'}
                    fontFamily={'Inter'}
                    fontSize={'lg'}
                    fontWeight={400}
                    textTransform={'none'}
                    fontStyle={'normal'}
                    lineHeight={'normal'}
                  >
                    Flow Name
                  </Th>
                  <Th
                    color={'text.tableHeading'}
                    fontFamily={'Inter'}
                    fontSize={'lg'}
                    fontWeight={400}
                    textTransform={'none'}
                    fontStyle={'normal'}
                    lineHeight={'normal'}
                  >
                    Flow Description
                  </Th>
                  <Th
                    color={'text.tableHeading'}
                    fontFamily={'Inter'}
                    fontSize={'lg'}
                    fontWeight={400}
                    textTransform={'none'}
                    fontStyle={'normal'}
                    lineHeight={'normal'}
                  >
                    Last Edited on
                  </Th>
                  <Th
                    color={'text.tableHeading'}
                    fontFamily={'Inter'}
                    fontSize={'lg'}
                    fontWeight={400}
                    textTransform={'none'}
                    fontStyle={'normal'}
                    lineHeight={'normal'}
                  >
                    Created at
                  </Th>
                  <Th display={'flex'} justifyContent={'right'}>
                    <Button
                      width={'7.375rem'}
                      height={'1.75rem'}
                      backgroundColor={'primary.100'}
                      color={'white'}
                      borderRadius={'0.25rem'}
                      _hover={{ backgroundColor: 'primary.90' }}
                      onClick={createFlowOnOpen}
                    >
                      Create Flow
                    </Button>
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.length > 0 &&
                  data?.map((item, index) => {
                    const date_update_at = new Date(item.audit.updated_at);
                    const date_created_at = new Date(item.audit.created_at);
                    const options = {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    };
                    return (
                      <Tr
                        height={'3.125rem'}
                        key={index}
                        backgroundColor={'white'}
                      >
                        <Td
                          color={'text.body'}
                          fontSize={'md'}
                          height={'3.125rem'}
                        >
                          {item.name}
                        </Td>
                        <Td
                          color={'text.body'}
                          fontSize={'md'}
                          height={'3.125rem'}
                        >
                          {item.description}
                        </Td>
                        <Td
                          color={'text.body'}
                          fontSize={'md'}
                          height={'3.125rem'}
                        >
                          {date_update_at.toLocaleDateString('en-US', options)}
                        </Td>
                        <Td
                          color={'text.body'}
                          fontSize={'md'}
                          height={'3.125rem'}
                        >
                          {date_created_at.toLocaleDateString('en-US', options)}
                        </Td>
                        <Td height={'3.125rem'} alignItems={'center'}>
                          <Popover placement="bottom-end">
                            <Box
                              display={'flex'}
                              justifyContent={'right'}
                              cursor={'pointer'}
                            >
                              <PopoverTrigger>
                                <Icon
                                  icon="ph:dots-three-outline-vertical-fill"
                                  width={'1.375rem'}
                                  height={'1.375rem'}
                                />
                              </PopoverTrigger>
                            </Box>
                            <PopoverContent width={'6.8125rem'}>
                              <PopoverBody>
                                <List spacing={3}>
                                  <ListItem
                                    cursor={'pointer'}
                                    onClick={() => {
                                      console.log(item);
                                      setSelectedItem(item), editModalOnOpen();
                                    }}
                                  >
                                    Edit
                                  </ListItem>
                                  <Divider />
                                  <ListItem cursor={'pointer'}>Delete</ListItem>
                                  <Divider />
                                  <ListItem cursor={'pointer'}>
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
};

export default TableComponent;
