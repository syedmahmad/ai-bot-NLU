import React from 'react';
import { Handle, Position } from 'reactflow';
import {
  Box,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text
} from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useWidgets } from '../../context/WidgetsContext';

function CarouselComponent({ data, isConnectable }) {
  const { widget } = useWidgets();

  console.log("widget", widget);

  const handleClick = (event) => {
    // saving node id to use it later when user try to create new ndoe
    event.target.setAttribute('data-id', data.sourceHandle);
    data.onNodeClick(event);
  };

  return (
    <>
      {/* handle={type="target"} means
          (isConnectableEnd?) Dictates whether a connection can end on this handle.
      */}
      <Handle
          isConnectable={isConnectable}
          onConnect={(params) => console.log('handle onConnect', params)}
          position={Position.Top}
          style={{ background: '#000' }}
          type="target"
      />

      <Popover
          isLazy
          placement="left-start"
      >
        <PopoverTrigger>
          <Box
              onClick={handleClick}
              style={{
              background: '#fff',
              height: 'fit-content',
              width: '300px',
            }}
          >
            <Box
                background="#D1EAFE"
                borderRadius="17.487px 17.487px 0px 17.487px"
                padding={4}
                width="100%"
            >
              <Box
                  alignItems="center"
                  background="#fff"
                  borderRadius="17.487px 17.487px 0px 17.487px"
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  minHeight="68px"
                  padding="25px 28px"
                  width="100%"
              />
            </Box>

          </Box>
        </PopoverTrigger>

        <PopoverContent>
          <PopoverArrow />

          {/* <PopoverCloseButton /> */}
          <PopoverHeader
              display="flex"
              justifyContent="space-between"
              padding="15px 10px 0px"
          >
            <Box>
              Carousel
            </Box>

            <Box>
              <Icon
                  color='hsla(0, 0%, 85%, 1)'
                  icon="bi:three-dots-vertical"
              />
            </Box>
          </PopoverHeader>

          <PopoverBody
              padding="20px"
          >
            <Text
                color="text.body"
                fontSize="xs"
            >
              Carousel Label
            </Text>

            
          </PopoverBody>
        </PopoverContent>
      </Popover>

      {/* handle={type="source"} means
          (isConnectableStart?) Dictates whether a connection can start from this handle.
      */}
      <Handle
          id={data.sourceHandle}
          isConnectable={isConnectable}
          onConnect={(params) => console.log('handle onConnect', params)}
          position={Position.Bottom}
          style={{ background: '#000' }}
          type="source"
      />
    </>
  );
}

export default CarouselComponent;
