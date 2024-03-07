import React, { useEffect, useState } from "react";
import {
  Text,
  Input,
  Select,
  Box
} from '@chakra-ui/react';
import { Icon } from '@iconify/react';

function ButtonBody({ comp, setComp, components}) {
  const [ btnLabel, setBtnLabel] = useState(comp?.props?.label)
  const [ btnType, setBtnType] = useState(comp?.props?.variant);

  useEffect(() => {
    const arr = components?.map((item) => {
      if (item.order === comp.order) {
        item.props = {
          ...item.props,
          label: btnLabel,
          variant: btnType
        }
      }
      return item
    });
    setComp(arr);
  }, [btnLabel, btnType]);

  const deleteNode = () => {
    if (components.length === 1) {
      alert("Node should contain atleast 1 widget!");
      return;
    }
    const newData = components.filter((data) => data.order !== comp.order);
    setComp(newData);
  }
  
  return(
    <Box
        display="flex"
        justifyContent="space-between"
    >
      <Box
          marginLeft="10px"
          width="93%"
      >
        <Text
            color="text.body"
            fontSize="xs"
            marginBottom="5px"
        >
          Button Label
        </Text>

        <Input
            borderRadius="0.3125rem"
            height="40px"
            marginBottom="10px"
            onChange={(e) => setBtnLabel(e.target.value)}
            placeholder="Type here"
            size="sm"
            value={btnLabel}
        />

        <Text
            color="text.body"
            fontSize="xs"
            marginBottom="5px"
        >
          Button Type
        </Text>

        <Select
            marginBottom="10px"
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
      </Box>

      <Box
          cursor="pointer"
          marginTop="25px"
          onClick={() => deleteNode()}
          style={{height: 'fit-content'}}
      >
        <Icon
            color='hsla(0, 0%, 85%, 1)'
            icon="ic:outline-delete"
        />
      </Box>
    </Box>
  )
}

export default ButtonBody;