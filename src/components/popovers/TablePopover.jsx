import React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  List,
  ListItem,
  Divider,
  Box,
  PopoverCloseButton
} from '@chakra-ui/react';
import { Icon } from '@iconify/react';

function TablePopover({ setSelectedItem, editModalOnOpen, item, deleteFlow}) {
  return(
    <Popover
        placement="bottom-end"
    >
      <Box
          cursor="pointer"
          display="flex"
          justifyContent="right"
      >
        <PopoverTrigger>
          <Icon
              height="1.375rem"
              icon="ph:dots-three-outline-vertical-fill"
              width="1.375rem"
          />
        </PopoverTrigger>
      </Box>

      <PopoverContent width="6.8125rem">
        <PopoverBody>
          <PopoverCloseButton style={{display: 'none'}} />

          <List spacing={3}>
            <ListItem
                cursor="pointer"
                onClick={() => {
                      setSelectedItem(item), editModalOnOpen();
                    }}
                textAlign="left"
            >
              Edit
            </ListItem>

            <Divider />

            <ListItem
                cursor="pointer"
                onClick={() => { deleteFlow(item)}}
                textAlign="left"
            >
              Delete
            </ListItem>

            <Divider />

            <ListItem
                cursor="pointer"
                onClick={() => alert("Coming Soon!")}
                textAlign="left"
            >
              Duplicate
            </ListItem>
          </List>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default TablePopover;