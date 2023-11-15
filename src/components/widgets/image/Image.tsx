/* eslint-disable */
import React, { memo, useState, useEffect, useRef } from 'react';
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
  Image
} from '@chakra-ui/react';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import { Handle, Position } from 'reactflow';

export default memo(({ data, isConnectable }: any) => {
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
        type="target"
        position={Position.Top}
        onConnect={(params) => console.log('handle onConnect', params)}
        style={{ background: '#000' }}
        isConnectable={isConnectable}
      />
      <Popover placement="left-start" isLazy>
        <PopoverTrigger>
          <Box
            style={{
              background: '#fff',
              height: 'fit-content',
              width: '300px',
            }}
            onClick={handleClick}
          >
            <Box
              width="100%"
              height="100%"
              background="#D1EAFE"
              borderRadius="17.487px 17.487px 0px 17.487px"
              padding={4}
            >
              <Box
                width="100%"
                height="68px"
                background="#fff"
                borderRadius="17.487px 17.487px 0px 17.487px"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                { file ? <Image src={file} alt='Preview' /> : null }
                { input ? <p> {input}</p> : null }
              </Box>
            </Box>
            {/* <img src="https://via.placeholder.com/300.png/09f/fff" alt="Girl in a jacket" width="100" height="100" /> */}
          </Box>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          {/* <PopoverCloseButton /> */}
          <PopoverHeader>Image</PopoverHeader>
          <PopoverBody>
            <Input placeholder="Type here" size="lg" onChange={(e) => setInput(e.target.value)}/>
            { file ? <Image src={file} alt='Preview' /> : null }
            { file ? null : <Input type="file" onChange={(e) => setFile(URL.createObjectURL(e.target.files[0]))} />}
            <Input placeholder="Add url here" size="lg" onChange={(e) => setUrl(e.target.value)}/>
          </PopoverBody>
        </PopoverContent>
      </Popover>
      {/* handle={type="source"} means
          (isConnectableStart?) Dictates whether a connection can start from this handle.
      */}
      <Handle
        id={data.sourceHandle}
        position={Position.Bottom}
        type="source"
        onConnect={(params) => console.log('handle onConnect', params)}
        style={{ background: '#000' }}
        isConnectable={isConnectable}
      />
    </>
  );
});
