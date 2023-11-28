/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Handle, Position } from 'reactflow';
import { Icon } from '@iconify/react';
import {
  Box,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from '@chakra-ui/react';
import { useWidgets } from '../../context/WidgetsContext';
import ViewComponent from './View';
import uniqid from 'uniqid';
import EditComponent from './Edit';

function WidgetComponent({ data, isConnectable }) {
  const [comp, setComp] = useState(data?.components || []);
  const { widget } = useWidgets();

  const fields = (widget) => {
    switch(widget) {
      case 'text':
        return {
          props: {
            value: "add something here"
          } 
        }
      case 'button':
        return {
          props: {
            label: "new button",
            variant: "solid"
          } 
        }
      case 'image':
        return {
          props: {
            file: null,
            link: null
          } 
        }
      case 'calendar':
        return {
          props: {
            type: 'monthly',
            multiple: false,
            value: new Date()
          } 
        }
      case 'carousel':
        return {
          props: {
            cards: [
              {
                id: uniqid(),
                label: 'card 1',
                file: null,
                link: 'https://picsum.photos/200/300',
                text: "<h1>Hello <b>write something here</b></h1>"
              }
            ]
          }
        }
      default:
        return;
    }
  }
  
  useEffect(() => {
    if (widget) {
      // get the order 
      let widgetOrder = comp.length === 0 ? 1 : comp[comp.length-1].order + 1;
      // appending new nodes
      const newComp = [...comp, {
        order: widgetOrder,
        name: widget,
        ...fields(widget)
      }]
      // appending new nodes to components.
      setComp(newComp);
      // appending new nodes to this custom flow node.
      data.components = newComp;
    }
  }, [widget])

  // useEffect(() => {
  //   if (data.components.length === 0) {
  //     const newComp = [{
  //       order: 1,
  //       name: data.type, // in case of bot response, adding widget name in data.type
  //       ...fields(data.type)
  //     }]
  //     // appending new nodes to components.
  //     setComp(newComp);
  //     // appending new nodes to this custom flow node.
  //     data.components = newComp;
  //   }
  // }, [data]);

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
          style={{ top: 'auto', visibility: 'hidden' }}
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
              background: 'transparent',
              height: 'fit-content',
              width: '300px',
              marginTop: '10px' 
            }}
          >
            <Box
                background={data.type === 'customer' ? "#FCD8E0" : "#D1EAFE"}
                borderRadius="17.487px 17.487px 0px 17.487px"
                padding={4}
                width="100%"
            >
              <Box
                  background="#fff"
                  borderRadius="17.487px 17.487px 0px 17.487px"
                  margin="6px 0px"
                  minHeight="68px"
                  width="100%"
              > 
                <ViewComponent comps={comp} />
              </Box>
            </Box>
          </Box>
        </PopoverTrigger>

        <PopoverContent
          // height="400px"
          // overflowY="auto"
          // overflowX={"hidden"}
        >
          <PopoverArrow />

          <PopoverHeader
              display="flex"
              justifyContent="space-between"
              padding="15px 10px 0px"
          >
            <Box textTransform={'capitalize'}>
              {comp[0]?.name}
            </Box>

            <Box>
              <Icon
                  color='hsla(0, 0%, 85%, 1)'
                  icon="bi:three-dots-vertical"
              />
            </Box>
          </PopoverHeader>

          <PopoverBody paddingBottom="30px">
            <EditComponent comps={comp} setComp={setComp} />
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
          style={{ background: '#fff', border: '1px solid', borderColor: 'hsla(0, 0%, 93%, 1)', top: "auto", marginBottom: '10px' }}
          type="source"
      />
    </>
  );
}

export default WidgetComponent;
