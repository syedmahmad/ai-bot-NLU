import React, { useState, useEffect } from 'react';
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
  Button,
  Image,
  Text
} from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useWidgets } from '../../context/WidgetsContext';

function ImageComponent({ data, isConnectable }) {
  const { widget } = useWidgets();

  console.log("widget", widget);
  const [input, setInput] = useState('');
  const [url, setUrl] = useState('');
  const [file, setFile] = useState('');

  useEffect(() => {
    setFile(url);
  }, [url]);

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
                {file ? <Image
                    alt="Preview"
                    borderRadius="0.3125rem"
                    src={file}
                        /> : null}

                {input ? (
                  <Box
                      width="100%"
                  >
                    <Text
                        color="text.body"
                        fontSize="md"
                        margin="6px 0px"
                        textAlign="left"
                        textTransform="capitalize"
                    > 
                      {input}
                    </Text>
                  </Box>
                ): null}

              </Box>
            </Box>

            {/* <img src="https://via.placeholder.com/300.png/09f/fff" alt="Girl in a jacket" width="100" height="100" /> */}
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
              Image
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
              Text
            </Text>

            <Box
                display="flex"
                justifyContent="space-between"
                marginBottom="10px"
            >
              <Box width="93%">
                <Input
                    borderRadius="0.3125rem"
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type here"
                    size="sm"
                />
              </Box>

              <Box
                  alignItems="center"
                  display="flex"
                  height="inherit"
              >
                <Icon
                    color='hsla(0, 0%, 85%, 1)'
                    icon="ic:outline-delete"
                />
              </Box>
            </Box>

            {file ? <Image
                alt="Preview"
                borderRadius="0.3125rem"
                src={file}
                width="93%"
                    /> : null}

            {file ? null : (
              <>
                <Text
                    color="text.body"
                    fontSize="xs"
                >
                  Upload Image
                </Text>

                <Box
                    display="flex"
                    justifyContent="space-between"
                    marginBottom="10px"
                >
                  <Box
                      alignItems="center"
                      backgroundColor="background.flowDiagram"
                      border="0.5px solid"
                      borderColor="stroke.table"
                      borderRadius="0.3125rem"
                      display="flex"
                      height="8.0625rem"
                      justifyContent="center"
                      paddingTop="20%"
                      width="93%"
                  >
                    <Button
                        _hover={{ backgroundColor: 'primary.90' }}
                        backgroundColor="primary.100"
                        borderRadius="0.25rem"
                        color="white"
                        height="1.75rem"
                        onClick={() => document.getElementById("file").click()}
                        width="7.375rem"
                    >
                      Upload
                    </Button>

                    <Input
                        id="file"
                        onChange={(e) =>
                  setFile(URL.createObjectURL(e.target.files[0]))}
                        style={{display: "none"}}
                        type="file"
                    />
                  </Box>

                  <Box>
                    <Icon
                        color='hsla(0, 0%, 85%, 1)'
                        icon="ic:outline-delete"
                    />
                  </Box>
                </Box>
              </>
            )}

            <Text
                color="text.body"
                fontSize="xs"
            >
              Add Link
            </Text>

            <Input
                borderRadius="0.3125rem"
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Add url here"
                size="sm"
                width="93%"
            />
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

export default ImageComponent;
