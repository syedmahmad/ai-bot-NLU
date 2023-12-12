import { Icon } from '@iconify/react';
import { Box, Heading, Divider } from '@chakra-ui/react';
import { sideBarItems } from './sidebarConfig';

function Sidebar() {
  return (
    <Box
        backgroundColor="background.menu"
        height="calc(100vh - 3.1875rem)"
        padding="4rem 1.25rem"
        width="12rem"
    >
      <Heading
          color="text.card"
          fontSize="xs"
          fontWeight={400}
          lineHeight="20px"
      >
        AVAILABLE BOTS
      </Heading>

      <Box
          display="flex"
          flexDirection="column"
      >
        {sideBarItems.map((items) => {
          return (
            <Box key={items.title}>
              <Box
                  alignItems="center"
                  display="flex"
                  height="2.0625rem"
                  justifyContent="space-between"
                  width="100%"
              >
                <Box
                    display="flex"
                    width="80%"
                >
                  <Box
                      marginRight="2"
                      width="20%"
                  >
                    <Icon
                        color="hsla(0, 0%, 38%, 1)"
                        icon={items.icon}
                    />
                  </Box>

                  <Box>
                    <Heading
                        color="text.card"
                        fontSize="sm"
                        fontWeight={500}
                        lineHeight="auto"
                    >
                      {items.title}
                    </Heading>
                  </Box>
                </Box>

                {items.childrens.length > 0 && (
                  <Box width="20%">
                    <Icon
                        color="hsla(0, 0%, 38%, 1)"
                        icon="ri:arrow-drop-down-line"
                    />
                  </Box>
                )}
              </Box>

              {items.childrens.length > 0 &&
                items.childrens.map((item) => {
                  return (
                    <Box key={item.title}>
                      <Box
                          _hover={{
                          backgroundColor: 'white',
                          border: '0.5px solid',
                          borderColor: 'stroke.table',
                          borderRadius: '0.3125rem',
                        }}
                          alignItems="center"
                          cursor="pointer"
                          display="flex"
                          height="2.0625rem"
                          justifyContent="space-between"
                          onClick={() => window.open(item?.link, '_blank')}
                          paddingLeft="32px"
                          target='_blank'
                          width="100%"
                      >
                        <Heading
                            color="text.card"
                            fontSize="sm"
                            fontWeight={500}
                            lineHeight="auto"
                        >
                          {item.title}
                        </Heading>
                      </Box>

                      {item.childrens ? (
                        <Box
                            display="flex"
                            flexDirection="row"
                            h="55px"
                            margin="8px 0px"
                            paddingLeft="32px"
                        >
                          <Divider
                              opacity={1}
                              orientation="vertical"
                          />

                          <Box
                              display="flex"
                              flexDirection="column"
                              justifyContent="space-between"
                              paddingLeft="12px"
                          >
                            {item.childrens.map((item) => {
                              return (
                                <Box
                                    _hover={{
                                    backgroundColor: 'white',
                                    border: '0.5px solid',
                                    borderColor: 'stroke.table',
                                    borderRadius: '0.3125rem',
                                  }}
                                    height="26px"
                                    key={item.title}
                                    padding="4px 8px"
                                    width="80px"
                                >
                                  <Heading
                                      color="text.card"
                                      cursor="pointer"
                                      fontSize="sm"
                                      fontWeight={500}
                                      lineHeight="20px"
                                  >
                                    {item.title}
                                  </Heading>
                                </Box>
                              );
                            })}
                          </Box>
                        </Box>
                      ) : null}
                    </Box>
                  );
                })}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

export default Sidebar;
