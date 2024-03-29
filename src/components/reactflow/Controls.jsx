import React, { useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { Icon } from '@iconify/react';

function WidgetsControl({ addCustomerNode, addBotNode, addLogic }) {
  const [openWidgetControl, setOpenWidgetControl] = useState(true);
  const [openWidget, setOpenWidget] = useState(false);
  const [openLogic, setOpenLogic] = useState(false);
  const [widgetSelected, setWidgetSelected] = useState('');
  const [selectedSubElement, setSelectedSubElement] = useState('');

  const handlelCloseAll = () => {
    setOpenLogic(false);
    setOpenWidget(false);
    setOpenWidgetControl(false);
    setWidgetSelected('');
    setSelectedSubElement('');
  }

  return (
    <>
      <Box
          height="23.4375rem"
          position="absolute"
          right={-8}
          top={300}
          width="3.5rem"
      >
        {openWidgetControl ? <Box
            _hover={{ cursor: 'pointer'}}
            onClick={() => handlelCloseAll()}
                             >
          <Icon icon="tdesign:chevron-right-double" />
        </Box> : <Box
            _hover={{ cursor: 'pointer'}}
            onClick={() => setOpenWidgetControl(true)}
                 >
          <Icon icon="tdesign:chevron-left-double" />
        </Box> }
      </Box>

      {openWidgetControl ? <Box
          height="23.4375rem"
          position="absolute"
          right={10}
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
            width="4rem"
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
            width="4rem"
        >
          <Box
              color="secondary.100"
              fontFamily="Inter"
              fontSize="6px"
              fontStyle="normal"
              fontWeight={500}
              letterSpacing="0.3px"
              lineHeight="24px"
              textAlign="center"
          >
            Bot Response
          </Box>

          <Box
              _hover={
                {
                  backgroundColor: '#F1F9FF'
                }
              }
              alignContent="center"
              alignItems="center"
              backgroundColor={widgetSelected === 'widgets' ? '#F1F9FF' : ''}
              borderRadius="7px"
              cursor="pointer"
              display="flex"
              flexDirection="column"
              height="fit-content"
              justifyContent="center"
              margin="5px"
              onClick={() => {setOpenLogic(false), setOpenWidget(!openWidget), setWidgetSelected('widgets')}}
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

            <Box
                marginBottom={2}
                marginTop={2}
            >
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
              _hover={
                {
                  backgroundColor: 'hsla(205, 100%, 83%, 0.17)'
                }
              }
              alignContent="center"
              alignItems="center"
              backgroundColor={widgetSelected === 'logic' ? '#F1F9FF' : ''}
              borderRadius="7px"
              cursor="pointer"
              display="flex"
              flexDirection="column"
              height="fit-content"
              justifyContent="center"
              margin="5px"
              onClick={() => {setOpenWidget(false), setOpenLogic(!openLogic), setWidgetSelected('logic')}}
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

            <Box
                marginBottom={2}
                marginTop={2}
            >
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
              _hover={
                {
                  backgroundColor: 'hsla(205, 100%, 83%, 0.17)'
                }
              }
              alignContent="center"
              alignItems="center"
              borderRadius="7px"
              cursor="pointer"
              display="flex"
              flexDirection="column"
              height="fit-content"
              justifyContent="center"
              margin="5px"
              onClick={() => alert('coming soon!')}
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

            <Box
                marginBottom={2}
                marginTop={2}
            >
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
              _hover={
                {
                  backgroundColor: 'hsla(205, 100%, 83%, 0.17)'
                }
              }
              alignContent="center"
              alignItems="center"
              borderRadius="7px"
              cursor="pointer"
              display="flex"
              flexDirection="column"
              height="fit-content"
              justifyContent="center"
              margin="5px"
              onClick={() => alert('coming soon!')}
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

            <Box
                marginBottom={2}
                marginTop={2}
            >
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
              _hover={
                {
                  backgroundColor: 'hsla(205, 100%, 83%, 0.17)'
                }
              }
              alignContent="center"
              alignItems="center"
              borderRadius="7px"
              cursor="pointer"
              display="flex"
              flexDirection="column"
              height="fit-content"
              justifyContent="center"
              margin="5px"
              onClick={() => alert('coming soon!')}
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

            <Box
                marginBottom={2}
                marginTop={2}
            >
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
      </Box> : null}

      {openWidgetControl && openLogic ? (
        <Box
            backgroundColor="white"
            borderRadius="0.3125rem"
            boxShadow="0px 4px 10px 0px rgba(0, 0, 0, 0.06)"
            padding="0px"
            paddingTop={0}
            position="absolute"
            right="100px"
            top="230px"
            width="6.625rem"
        >
          <Box
              _hover={
                {
                  backgroundColor: '#F5F7F8'
                }
              }
              alignItems="center"
              backgroundColor={selectedSubElement === 'logic' ? '#F5F7F8' : ''}
              borderRadius="7px"
              cursor="pointer"
              display="flex"
              height="30px"
              margin="7px"
              onClick={() => {addLogic(), setSelectedSubElement('logic')}}
              padding="5px 15px"
              paddingBottom={0}
              width="9  3px"
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
                Conditions
              </Text>
            </Box>
          </Box>
        </Box>
      ) : null}

      {/*  */}
      {openWidgetControl && openWidget ? (
        <Box
            backgroundColor="white"
            borderRadius="0.3125rem"
            boxShadow="0px 4px 10px 0px rgba(0, 0, 0, 0.06)"
            padding="0.85rem 0px"
            paddingTop={0}
            position="absolute"
            right="100px"
            top="160px"
            width="6.625rem"
        >
          <Box
              _hover={
                  {
                    backgroundColor: '#F5F7F8'
                  }
                }
              alignItems="center"
              backgroundColor={selectedSubElement === 'text_widget' ? '#F5F7F8' : ''}
              borderRadius="7px"
              cursor="pointer"
              display="flex"
              height="30px"
              margin="7px"
              onClick={() => {addBotNode('text_widget'), setSelectedSubElement('text_widget')}}
              padding="5px 1.06rem"
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
              _hover={
                {
                  backgroundColor: '#F5F7F8'
                }
              }
              alignItems="center"
              backgroundColor={selectedSubElement === 'button_widget' ? '#F5F7F8' : ''}
              borderRadius="7px"
              cursor="pointer"
              display="flex"
              height="30px"
              margin="7px"
              onClick={() => {addBotNode('button_widget'), setSelectedSubElement('button_widget')}}
              padding="5px 1.06rem"
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
              _hover={
                {
                  backgroundColor: '#F5F7F8'
                }
              }
              alignItems="center"
              backgroundColor={selectedSubElement === 'image_widget' ? '#F5F7F8' : ''}
              borderRadius="7px"
              cursor="pointer"
              display="flex"
              height="30px"
              margin="7px"
              onClick={() => {addBotNode('image_widget'), setSelectedSubElement('image_widget')}}
              padding="5px 1.06rem"
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
              _hover={
                {
                  backgroundColor: '#F5F7F8'
                }
              }
              alignItems="center"
              backgroundColor={selectedSubElement === 'carousel_widget' ? '#F5F7F8' : ''}
              borderRadius="7px"
              cursor="pointer"
              display="flex"
              height="30px"
              margin="7px"
              onClick={() => {addBotNode('carousel_widget'), setSelectedSubElement('carousel_widget')}}
              padding="5px 1.06rem"
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
              _hover={
                {
                  backgroundColor: '#F5F7F8'
                }
              }
              alignItems="center"
              backgroundColor={selectedSubElement === 'calendar_widget' ? '#F5F7F8' : ''}
              borderRadius="7px"
              cursor="pointer"
              display="flex"
              height="30px"
              margin="7px"
              onClick={() => {addBotNode('calendar_widget'), setSelectedSubElement('calendar_widget')}}
              padding="5px 1.06rem"
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
      ) : null}
    </>
  );
}

export default WidgetsControl;
