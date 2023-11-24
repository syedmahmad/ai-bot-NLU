import React, { useEffect, useState } from "react";
import {
  Text,
  Input,
  Select
} from '@chakra-ui/react';

function ButtonBody({ comp, setComp, components}) {
  const [ btnLabel, setBtnLabel] = useState(comp?.props?.label)
  const [ btnType, setBtnType] = useState(comp?.props?.variant);

  useEffect(() => {
    const arr = components?.map((item) => {
      if (item.order === comp.order) {
        item.props = {
          ...item.order.props,
          label: btnLabel,
          variant: btnType
        }
      }
      return item
    });
    setComp(arr);
  }, [btnLabel, btnType]);
  
  return(
    <>
      <Text
          color="text.body"
          fontSize="xs"
          marginBottom="5px"
      >
        Button Label
      </Text>

      <Input
          borderRadius="0.3125rem"
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
    </>
  )
}

export default ButtonBody;