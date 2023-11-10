import { Icon } from '@iconify/react';
import { Box, Heading, Divider } from '@chakra-ui/react';
import { sideBarItems } from './sidebarConfig';

const Sidebar = () => {
  return (
    <Box
      width="12rem"
      height="calc(100vh - 3.1875rem)"
      backgroundColor="background.menu"
      padding="4rem 1.25rem"
    >
      <Heading
        fontSize={'xs'}
        fontWeight={400}
        color={'text.card'}
        lineHeight={'20px'}
      >
        AVAILABLE BOTS
      </Heading>
      <Box display={'flex'} flexDirection={'column'}>
        {sideBarItems.map((items) => {
          return (
            <>
              <Box
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
                height={'2.0625rem'}
                width={'100%'}
              >
                <Box width={'80%'} display={'flex'}>
                  <Box marginRight={'2'} width={'20%'}>
                    <Icon color="hsla(0, 0%, 38%, 1)" icon={items.icon} />
                  </Box>
                  <Box>
                    <Heading
                      color={'text.card'}
                      fontWeight={500}
                      fontSize={'sm'}
                      lineHeight={'auto'}
                    >
                      {items.title}
                    </Heading>
                  </Box>
                </Box>
                {items.childrens.length > 0 && (
                  <Box width={'20%'}>
                    <Icon
                      icon="ri:arrow-drop-down-line"
                      color="hsla(0, 0%, 38%, 1)"
                    />
                  </Box>
                )}
              </Box>
              {items.childrens.length > 0 &&
                items.childrens.map((item) => {
                  return (
                    <>
                      <Box
                        display={'flex'}
                        justifyContent={'space-between'}
                        alignItems={'center'}
                        height={'2.0625rem'}
                        width={'100%'}
                        cursor={'pointer'}
                        paddingLeft={'32px'}
                        _hover={{
                          backgroundColor: 'white',
                          border: '0.5px solid',
                          borderColor: 'stroke.table',
                          borderRadius: '0.3125rem',
                        }}
                      >
                        <Heading
                          color={'text.card'}
                          fontWeight={500}
                          fontSize={'sm'}
                          lineHeight={'auto'}
                        >
                          {item.title}
                        </Heading>
                      </Box>
                      {item.childrens && (
                        <Box
                          display={'flex'}
                          flexDirection={'row'}
                          h="55px"
                          paddingLeft={'32px'}
                          margin={'8px 0px'}
                        >
                          <Divider orientation="vertical" opacity={1} />
                          <Box
                            display={'flex'}
                            flexDirection={'column'}
                            paddingLeft={'12px'}
                            justifyContent={'space-between'}
                          >
                            {item.childrens.map((item) => {
                              return (
                                <Box
                                  key={item.title}
                                  width={'80px'}
                                  height={'26px'}
                                  padding={'4px 8px'}
                                  _hover={{
                                    backgroundColor: 'white',
                                    border: '0.5px solid',
                                    borderColor: 'stroke.table',
                                    borderRadius: '0.3125rem',
                                  }}
                                >
                                  <Heading
                                    cursor={'pointer'}
                                    color={'text.card'}
                                    fontWeight={500}
                                    fontSize={'sm'}
                                    lineHeight={'20px'}
                                  >
                                    {item.title}
                                  </Heading>
                                </Box>
                              );
                            })}
                          </Box>
                        </Box>
                      )}
                    </>
                  );
                })}
            </>
          );
        })}
      </Box>
    </Box>
  );
};

export default Sidebar;
