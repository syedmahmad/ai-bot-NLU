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
} from '@chakra-ui/react';
import { Icon } from '@iconify/react';

function TableComponent() {
  const tablerows = [
    {
      id: '1',
      name: 'Welcome',
      description: 'The welcome journey',
      updatedAt: 'Sep 7 2023',
      createdAt: 'Jan 10 2023',
    },
    {
      id: '2',
      name: 'Fallback',
      description: 'The Fallback journey',
      updatedAt: 'Feb 10 2023',
      createdAt: 'Jan 10 2023',
    },
    {
      id: '3',
      name: 'Test flow',
      description: 'Testing',
      updatedAt: 'Sep 7 2023',
      createdAt: 'Jan 10 2023',
    },
    {
      id: '4',
      name: 'Start',
      description: 'Start',
      updatedAt: 'Sep 7 2023',
      createdAt: 'Jan 10 2023',
    },
    {
      id: '5',
      name: 'Chat with Agent',
      description: 'Chat with Agent',
      updatedAt: 'Sep 7 2023',
      createdAt: 'Jan 10 2023',
    },
  ];
  return (
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
                      width="7.375rem"
                  >
                    Create Flow
                  </Button>
                </Th>
              </Tr>
            </Thead>

            <Tbody>
              {tablerows.length > 0 &&
                tablerows.map((item) => (
                  <Tr
                      backgroundColor="white"
                      height="3.125rem"
                      key={item.id}
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
                      {item.updatedAt}
                    </Td>

                    <Td
                        color="text.body"
                        fontSize="md"
                        height="3.125rem"
                    >
                      {item.createdAt}
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
                              <ListItem>
                                Edit
                              </ListItem>

                              <Divider />

                              <ListItem>
                                Delete
                              </ListItem>

                              <Divider />

                              <ListItem>
                                Duplicate
                              </ListItem>
                            </List>
                          </PopoverBody>
                        </PopoverContent>
                      </Popover>
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default TableComponent;
