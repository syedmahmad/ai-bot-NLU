import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';
import {
  Box,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from '@chakra-ui/react';
import DatePicker from "react-multi-date-picker";

function Calendar({ data, isConnectable }) {
  const [value, setValue] = useState(new Date());

  console.log("value", value)
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
              />
            </Box>
          </Box>
        </PopoverTrigger>

        <PopoverContent>
          <PopoverArrow />

          {/* <PopoverCloseButton /> */}
          <PopoverHeader>
            Image
          </PopoverHeader>

          <PopoverBody>
            <DatePicker
             // disableDayPicker
                disableMonthPicker
                disableYearPicker
                format="YYYY/MM/DD"
                onChange={setValue}
                onlyMonthPicker={false}
                onlyYearPicker={false}
                placeholder="Choose a date"
                range={false}
                style={{}}
                value={value}
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

export default Calendar;
