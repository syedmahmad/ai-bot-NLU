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
  Image,
} from '@chakra-ui/react';
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
                height="100%"
                padding={4}
                width="100%"
            >
              <Box
                  alignItems="center"
                  background="#fff"
                  borderRadius="17.487px 17.487px 0px 17.487px"
                  display="flex"
                  height="68px"
                  justifyContent="center"
                  width="100%"
              >
                {file ? <Image
                    alt="Preview"
                    src={file}
                        /> : null}

                {input ? <p> 
                  {' '}

                  {input}
                </p> : null}
              </Box>
            </Box>

            {/* <img src="https://via.placeholder.com/300.png/09f/fff" alt="Girl in a jacket" width="100" height="100" /> */}
          </Box>
        </PopoverTrigger>

        <PopoverContent>
          <PopoverArrow />

          {/* <PopoverCloseButton /> */}
          <PopoverHeader>
            Image
          </PopoverHeader>

          <PopoverBody>
            <Input
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type here"
                size="lg"
            />

            {file ? <Image
                alt="Preview"
                src={file}
                    /> : null}

            {file ? null : (
              <Input
                  onChange={(e) =>
                  setFile(URL.createObjectURL(e.target.files[0]))}
                  type="file"
              />
            )}

            <Input
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Add url here"
                size="lg"
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
          style={{ background: '#000' }}
          type="source"
      />
    </>
  );
}

export default ImageComponent;
