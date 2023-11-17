import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';
import {
  Box,
  Text,
  Input,
  Select,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import { Calendar } from "react-multi-date-picker";

function CalendarComponent({ data, isConnectable }) {
  const [input, setInput] = useState('Select date on which you want to see your transaction details');
  const [calendarType, setCalendarType] = useState('daily');
  const [selectionType, setSelectionType] = useState('single'); 
  const [value, setValue] = useState(new Date());
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
          style={{ background: '#000', top: "auto" }}
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
                height='fit-content'
                padding={2}
                width="100%"
            >
              <Box
                  alignItems="center"
                  background="#fff"
                  borderRadius="17.487px 17.487px 0px 17.487px"
                  display="flex"
                  flexDirection="column"
                  height='fit-content'
                  justifyContent="center"
                  padding="20px 10px"
                  width="100%"
              >
                <Box>
                  <Calendar
                      onChange={setValue}
                      onlyMonthPicker={calendarType === 'monthly' ? true : false}
                      onlyYearPicker={calendarType === 'yearly' ? true : false}
                      range={selectionType === 'multiple' ? true : false}
                      style={{}}
                      value={value}
                  />
                </Box>

                <Box>
                  <Text
                      color="text.menu"
                      fontFamily="Inter"
                      fontSize="sm"
                      fontWeight={300}
                      margin="10px 5px"
                  >
                    {input}
                  </Text>
                </Box>
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
              Calendar
            </Box>

            <Box>
              <Icon
                  color='hsla(0, 0%, 85%, 1)'
                  icon="bi:three-dots-vertical"
              />
            </Box>
          </PopoverHeader>

          <PopoverBody>
            <Box>
              <Text
                  color="text.menu"
                  fontFamily="Inter"
                  fontSize="sm"
                  fontWeight={300}
              >
                Text
              </Text>

              <Input
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type here"
                  size="sm"
              />

              <Text
                  color="text.menu"
                  fontFamily="Inter"
                  fontSize="sm"
                  fontWeight={300}
                  marginTop="15px"
              >
                Calendar Type
              </Text>

              <Select
                  onChange={(e) => {
                    setCalendarType(e.target.value);
                    setValue(new Date());
                  }}
                  placeholder='Calendar Type'
                  size="sm"
                  value={calendarType}
              >
                <option
                    selected
                    value='daily'
                >
                  Daily Calendar
                </option>

                <option value='monthly'>
                  Monthly Calendar
                </option>

                <option value='yearly'>
                  Yearly Calendar
                </option>
              </Select>

              <Text
                  color="text.menu"
                  fontFamily="Inter"
                  fontSize="sm"
                  fontWeight={300}
                  marginTop="15px"
              >
                Selection Type
              </Text>

              <Select
                  onChange={(e) => {
                    setSelectionType(e.target.value);
                    setValue(new Date());
                  }}
                  placeholder='Selection Type'
                  size="md"
                  value={selectionType}
              >
                <option
                    selected
                    value='single'
                >
                  Single Date
                </option>

                <option value='multiple'>
                  Multiple Dates (from one date to another date). 
                </option>

              </Select>
            </Box>
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
          style={{ background: '#000', top: "98%" }}
          type="source"
      />
    </>
  );
}

export default CalendarComponent;
