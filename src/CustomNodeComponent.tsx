/* eslint-disable */
import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { Box, Center } from '@chakra-ui/react';
// import { Handle, Position } from 'reactflow';

export default memo(({ data, isConnectable }: any) => {
    // console.log('data', data, isConnectable);

  const handleClick = (event) => {
    debugger;
    data.onNodeClick(event);
  }

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
      
      <Box style={{background: "#fff", height: 'fit-content', width: '300px'}} data-id={data.sourceHandle} onClick={handleClick}>
        <Box width="100%" height="100%" background="#D1EAFE" borderRadius="17.487px 17.487px 0px 17.487px" padding={4}>
          <Box width="100%" height="100%" background="#fff" borderRadius="17.487px 17.487px 0px 17.487px" display="flex" justifyContent="center" alignItems="center">
            Custom Color Picker Node
          </Box>
          <Box width="100%" height="100%" background="#fff" borderRadius="17.487px 17.487px 0px 17.487px" display="flex" justifyContent="center" alignItems="center">
            Custom Color Picker Node
          </Box>
          <Box width="100%" height="100%" background="#fff" borderRadius="17.487px 17.487px 0px 17.487px" display="flex" justifyContent="center" alignItems="center">
            Custom Color Picker Node
          </Box>
        </Box>
        {/* <img src="https://via.placeholder.com/300.png/09f/fff" alt="Girl in a jacket" width="100" height="100" /> */}
      </Box>
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
