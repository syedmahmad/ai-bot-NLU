import React, { useState, useEffect } from "react";
import {
  Text,
  Input,
  Select,
  Box
} from '@chakra-ui/react';
import { Icon } from '@iconify/react';

function CalendarBody({ comp, setComp, components}) {
  const [ input, setInput] = useState(comp?.props?.value);
  const [ selectionType, setSelectionType] = useState(comp?.props?.multiple ? 'multiple' : 'single');
  const [ calendarType, setCalendarType] = useState(comp?.props?.type);

  useEffect(() => {
    const arr = components?.map((item) => {
      if (item.order === comp.order) {
        item.props = {
          ...item.props,
          value: input,
          multiple: selectionType === 'multiple' ? true : false,
          type: calendarType
        }
      }
      return item
    });
    setComp(arr);
  }, [input, selectionType, calendarType]);

  return(
    <Box
        display="flex"
        justifyContent="space-between"
    >
      <Box
          width="93%"
      >
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
                    // setValue(new Date());
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

      <Box
          marginTop="25px"
      >
        <Icon
            color='hsla(0, 0%, 85%, 1)'
            icon="ic:outline-delete"
        />
      </Box>
    </Box>
  )
}

export default CalendarBody;