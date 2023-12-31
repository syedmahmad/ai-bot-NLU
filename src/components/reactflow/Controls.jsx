import React, { useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { Icon } from '@iconify/react';

function WidgetsControl({ addCustomerNode, addBotNode }) {
  const [openWidget, setOpenWidget] = useState(false);

  return (
    <>
      <Box
          height="23.4375rem"
          position="absolute"
          right={5}
          top={10}
          width="3.5rem"
      >
        <Box
            alignContent="center"
            backgroundColor="white"
            borderRadius="0.3125rem"
            boxShadow="0px 4px 10px 0px rgba(0, 0, 0, 0.06)"
            cursor="pointer"
            display="flex"
            flexDirection="column"
            height="fit-content"
            justifyContent="center"
            onClick={addCustomerNode}
            padding="0.85rem 0.5rem"
            width="3.5rem"
        >
          <Box
              display="flex"
              justifyContent="center"
              width="100%"
          >
            <Icon icon="tdesign:chat" />
          </Box>

          <Box marginTop={2}>
            <Text
                align="center"
                fontFamily="Inter"
                fontSize="8px"
                fontWeight={400}
            >
              Customer Response
            </Text>
          </Box>
        </Box>

        <br />

        <Box
            backgroundColor="white"
            borderRadius="0.3125rem"
            boxShadow="0px 4px 10px 0px rgba(0, 0, 0, 0.06)"
            padding="0.85rem 0px"
            paddingTop={0}
            width="3.5rem"
        >
          <Box
              alignContent="center"
              cursor="pointer"
              display="flex"
              flexDirection="column"
              height="fit-content"
              justifyContent="center"
              onClick={() => setOpenWidget(!openWidget)}
              padding="0.85rem 0.5rem"
              paddingBottom={0}
          >
            <Box
                display="flex"
                justifyContent="center"
                width="100%"
            >
              <Icon icon="solar:widget-4-linear" />
            </Box>

            <Box marginTop={2}>
              <Text
                  align="center"
                  fontFamily="Inter"
                  fontSize="8px"
                  fontWeight={400}
              >
                Widgets
              </Text>
            </Box>
          </Box>

          <Box
              alignContent="center"
              cursor="pointer"
              display="flex"
              flexDirection="column"
              height="fit-content"
              justifyContent="center"
              padding="0.85rem 0.5rem"
              paddingBottom={0}
          >
            <Box
                display="flex"
                justifyContent="center"
                width="100%"
            >
              <Icon icon="carbon:flow" />
            </Box>

            <Box marginTop={2}>
              <Text
                  align="center"
                  fontFamily="Inter"
                  fontSize="8px"
                  fontWeight={400}
              >
                Logic
              </Text>
            </Box>
          </Box>

          <Box
              alignContent="center"
              cursor="pointer"
              display="flex"
              flexDirection="column"
              height="fit-content"
              justifyContent="center"
              padding="0.85rem 0.5rem"
              paddingBottom={0}
          >
            <Box
                display="flex"
                justifyContent="center"
                width="100%"
            >
              <Icon icon="carbon:show-data-cards" />
            </Box>

            <Box marginTop={2}>
              <Text
                  align="center"
                  fontFamily="Inter"
                  fontSize="8px"
                  fontWeight={400}
              >
                Forms
              </Text>
            </Box>
          </Box>

          <Box
              alignContent="center"
              cursor="pointer"
              display="flex"
              flexDirection="column"
              height="fit-content"
              justifyContent="center"
              padding="0.85rem 0.5rem"
              paddingBottom={0}
          >
            <Box
                display="flex"
                justifyContent="center"
                width="100%"
            >
              <Icon icon="ant-design:node-index-outlined" />
            </Box>

            <Box marginTop={2}>
              <Text
                  align="center"
                  fontFamily="Inter"
                  fontSize="8px"
                  fontWeight={400}
              >
                Actions
              </Text>
            </Box>
          </Box>

          <Box
              alignContent="center"
              cursor="pointer"
              display="flex"
              flexDirection="column"
              height="fit-content"
              justifyContent="center"
              padding="0.85rem 0.5rem"
              paddingBottom={0}
          >
            <Box
                display="flex"
                justifyContent="center"
                width="100%"
            >
              <Icon icon="iconamoon:profile-light" />
            </Box>

            <Box marginTop={2}>
              <Text
                  align="center"
                  fontFamily="Inter"
                  fontSize="8px"
                  fontWeight={400}
              >
                Agent Handover
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>

      {/*  */}
      {openWidget ? (
        <Box
            height="23.4375rem"
            position="absolute"
            right="135px"
            top="160px"
            width="3.5rem"
        >
          <Box
              backgroundColor="white"
              borderRadius="0.3125rem"
              boxShadow="0px 4px 10px 0px rgba(0, 0, 0, 0.06)"
              padding="0.85rem 0px"
              paddingTop={0}
              width="6.625rem"
          >
            <Box
                alignItems="center"
                cursor="pointer"
                display="flex"
                height="fit-content"
                onClick={() => addBotNode('text_widget')}
                padding="0.85rem 1.06rem"
                paddingBottom={0}
            >
              <Box
                  display="flex"
                  width="32px"
              >
                <Icon icon="mdi:text" />
              </Box>

              <Box display="flex">
                <Text
                    align="center"
                    fontFamily="Inter"
                    fontSize="8px"
                    fontWeight={400}
                >
                  Text
                </Text>
              </Box>
            </Box>

            <Box
                alignItems="center"
                cursor="pointer"
                display="flex"
                height="fit-content"
                onClick={() => addBotNode('button_widget')}
                padding="0.85rem 1.06rem"
                paddingBottom={0}
            >
              <Box
                  display="flex"
                  width="32px"
              >
                <Icon icon="teenyicons:button-outline" />
              </Box>

              <Box display="flex">
                <Text
                    align="center"
                    fontFamily="Inter"
                    fontSize="8px"
                    fontWeight={400}
                >
                  Button
                </Text>
              </Box>
            </Box>

            <Box
                alignItems="center"
                cursor="pointer"
                display="flex"
                height="fit-content"
                onClick={() => addBotNode('image_widget')}
                padding="0.85rem 1.06rem"
                paddingBottom={0}
            >
              <Box
                  display="flex"
                  width="32px"
              >
                <Icon icon="ic:outline-image" />
              </Box>

              <Box display="flex">
                <Text
                    align="center"
                    fontFamily="Inter"
                    fontSize="8px"
                    fontWeight={400}
                >
                  Image
                </Text>
              </Box>
            </Box>

            <Box
                alignItems="center"
                cursor="pointer"
                display="flex"
                height="fit-content"
                onClick={() => addBotNode('carousel_widget')}
                padding="0.85rem 1.06rem"
                paddingBottom={0}
            >
              <Box
                  display="flex"
                  width="32px"
              >
                <Icon icon="bi:card-text" />
              </Box>

              <Box display="flex">
                <Text
                    align="center"
                    fontFamily="Inter"
                    fontSize="8px"
                    fontWeight={400}
                >
                  Carousel
                </Text>
              </Box>
            </Box>

            <Box
                alignItems="center"
                cursor="pointer"
                display="flex"
                height="fit-content"
                onClick={() => addBotNode('calendar_widget')}
                padding="0.85rem 1.06rem"
                paddingBottom={0}
            >
              <Box
                  display="flex"
                  width="32px"
              >
                <Icon icon="octicon:calendar-24" />
              </Box>

              <Box display="flex">
                <Text
                    align="center"
                    fontFamily="Inter"
                    fontSize="8px"
                    fontWeight={400}
                >
                  Calendar
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>
      ) : null}
    </>
  );
}

export default WidgetsControl;
