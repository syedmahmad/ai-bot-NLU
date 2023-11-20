import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';
import {
  Box,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Select,
  Button,
  Text
} from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useWidgets } from '../../context/WidgetsContext';

function ButtonComponent({ data, isConnectable }) {
  const { widget } = useWidgets();

  console.log("widget", widget);
  // eslint-disable-next-line react/hook-use-state
  const [btnlabel, setBtnLabel] = useState('');
  const [btnType, setBtnType] = useState('');

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
          style={{ top: 'auto', visibility: 'hidden' }}
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
              marginTop: '10px' 
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
              >
                <Button
                    colorScheme='teal'
                    variant={btnType}
                >
                  {btnlabel}
                </Button>
              </Box>
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
              Button
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
              Button Label
            </Text>

            <Input
                borderRadius="0.3125rem"
                onChange={(e) => setBtnLabel(e.target.value)}
                placeholder="Type here"
                size="sm"
            />

            <Text
                color="text.body"
                fontSize="xs"
            >
              Button Type
            </Text>

            <Select
                onChange={(e) => setBtnType(e.target.value)}
                placeholder='Button Type'
                size="md"
                value={btnType}
            >
              <option
                  selected
                  value='outline'
              >
                Outlined Button
              </option>

              <option value='ghost'>
                Text Button
              </option>

              <option
                  selected
                  value='solid'
              >
                Filled Button
              </option>

              <option value='link'>
                FAB Button
              </option>

            </Select>
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
          style={{ background: '#fff', border: '1px solid', borderColor: 'hsla(0, 0%, 93%, 1)', top: "auto", marginBottom: '10px' }}
          type="source"
      />
    </>
  );
}

export default ButtonComponent;
