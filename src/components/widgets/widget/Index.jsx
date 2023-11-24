/* eslint-disable */
import React, { useState, useEffect } from 'react';
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
  Checkbox,
  Button
} from '@chakra-ui/react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useWidgets } from '../../context/WidgetsContext';
import ViewComponent from './View';
import TextBody from '../../popoverBodies/Text';
import ButtonBody from '../../popoverBodies/Button';
import ImageBody from '../../popoverBodies/Image';
import CalendarBody from '../../popoverBodies/Calender';

function WidgetComponent({ data, isConnectable }) {
  const [comp, setComp] = useState(data?.components || []);
  
  
  
  
  
  
  const { widget } = useWidgets();
  console.log("widget", widget);

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
                background={data.nodeType === 'customer' ? "#FCD8E0" : "#D1EAFE"}
                borderRadius="17.487px 17.487px 0px 17.487px"
                padding={4}
                width="100%"
            >
              <Box
                  alignItems="center"
                  flexDirection={"column"}
                  background="#fff"
                  borderRadius="17.487px 17.487px 0px 17.487px"
                  color="text.body"
                  display="flex"
                  fontSize="md"
                  justifyContent="center"
                  margin="6px 0px"
                  minHeight="68px"
                  textTransform="capitalize"
                  width="100%"
              > 
                <ViewComponent components={comp} />
              </Box>
            </Box>
          </Box>
        </PopoverTrigger>

        <PopoverContent>
          <PopoverArrow />

          <PopoverHeader
              display="flex"
              justifyContent="space-between"
              padding="15px 10px 0px"
          >
            <Box>
              Text
            </Box>

            <Box>
              <Icon
                  color='hsla(0, 0%, 85%, 1)'
                  icon="bi:three-dots-vertical"
              />
            </Box>
          </PopoverHeader>

          <PopoverBody paddingBottom="30px">
          { 
            comp.map((comp) => {
                const props = comp?.props;
                switch(comp.name) {
                    case 'text':
                        return (<TextBody />);
                    case 'button':
                        return (<ButtonBody label={props.label} variant={props.variant}/>);
                    case 'image':
                        return (<ImageBody file={props.file} link={props.link} />);
                    case 'calendar':
                        return  <CalendarBody multiple={props.multiple} value={props.value} type={props.type} />;
                    case 'carousal':
                        return <>
                              </>;
                    default:
                        return null;
                }
            })
      }
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
