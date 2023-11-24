import React, { useState } from "react";
import {
  Text,
  Input,
  Select,
  Box
} from '@chakra-ui/react';

function CalendarBody(props) {
  const [ input, setInput] = useState(props?.value);
  const [ selectionType, setSelectionType] = useState(props?.multiple ? 'multiple' : 'single');
  const [ calendarType, setCalendarType] = useState(props?.type);
  console.log(input);
  return(
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
  )
}

export default CalendarBody;