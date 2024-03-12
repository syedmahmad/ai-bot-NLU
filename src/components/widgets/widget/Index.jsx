import React, { useEffect, useState } from 'react';
import { Handle, Position } from 'reactflow';
import {
  Box,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  PopoverCloseButton
} from '@chakra-ui/react';
import { useWidgets } from '../../context/WidgetsContext';
import ViewComponent from './View';
import EditComponent from './Edit';
import { createFields } from '../../../utils';
import { BotIcon } from '../../../assets/BotIcon';
import { CustomerIcon } from '../../../assets/CustomerIcon';

function WidgetComponent({ data, isConnectable }) {
  // needed this state to capture Text Editor ref so it will help us to close the editor
  // properly on blur event.
  const initialFocusRef = React.useRef(null);
  const [comp, setComp] = useState(data?.components || []);
  const { widget, addWidget, selectedComp } = useWidgets();

  // updating original components which are saving in db.
  useEffect(() => {
    if(comp.length) {
      data.components = comp;
    }
  }, [comp]);
  
  /* Via Context API, This executes every time the user wanted to add new widget.
      and add that new node in the same node components array, we are maintaining.
   */
  useEffect(() => {
    if (widget && data.sourceHandle === selectedComp) {
      // get the order 
      let widgetOrder = comp.length === 0 ? 1 : comp[comp.length-1].order + 1;
      // appending new nodes
      const newComp = [...comp, {
        order: widgetOrder,
        type: widget,
        ...createFields(widget)
      }]
      // appending new nodes to components.
      setComp(newComp);
      // appending new nodes to this custom flow node.
      data.components = newComp;
      // need to reset the widget else we're not able to create duplicate again.
      addWidget('');
    }
  }, [widget])

  /* This executes only first time when there is no data exist. */
  useEffect(() => {
    if (data.components.length === 0) {
      const newComp = [{
        order: 1,
        // in case of customer response. we just need to add text component.
        // in case of bot response, adding widget type in data.type (that could be any widget)
        type: data.type === 'customer_response_node' ? 'text_widget' : data.widgetName,
        ...createFields(data.widgetName)
      }]
      // appending new nodes to components.
      setComp(newComp);
      // appending new nodes to this custom flow node.
      data.components = newComp;
    }
  }, [data]);

  const handleClick = (event) => {
    // saving node id to use it later when user try to create new ndoe
    event.target.setAttribute('data-id', data.sourceHandle);
    data.onNodeClick(event);

    // on reactflow panel popover does not close properly so that is little hack otherwise.
    // you will see Editor buttons always there.
    if (initialFocusRef.current) {
      setTimeout(() => {
        document.getElementsByClassName('chakra-popover__close-btn')[0].click();
      }, 10);
    }
  };

  // const getPopOverHeading = (typeName) => {
  //   switch (typeName) {
  //     case 'logic_widget':
  //       return 'Conditions'
  //     case 'text_widget':
  //       return 'Text Input'
  //     case 'button_widget':
  //       return 'Button'
  //     case 'image_widget':
  //       return 'Image'
  //     case 'calendar_widget':
  //       return 'Calendar'
  //     case 'carousel_widget':
  //       return 'Carousel'
  //     default:
  //       return 'Text'
  //   }
  // }


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
          placement={data.type === 'customer_response_node' ? "right-start" : "left-start"}
          variant="responsive"
      >
        <PopoverTrigger>
          <Box
              alignItems='center'
              display='flex'
              flexDirection={data.type === 'customer_response_node' ? "row-reverse" : "row"}
              justifyContent='space-between'
          >
            <Box
                onClick={handleClick}
                style={{
                background: 'transparent',
                height: 'fit-content',
                width: '325px',
                marginTop: '10px' 
              }}
            >
              <Box
                  background={data.type === 'customer_response_node' ? "#FCD8E0" : "#D1EAFE"}
                  borderRadius={data.type === 'customer_response_node' ?  "17.487px 17.487px 17.487px 0px" : "17.487px 17.487px 0px 17.487px"}
                  padding={4}
                  width="100%"
              >
                <Box
                    background="#fff"
                    borderRadius={data.type === 'customer_response_node' ?  "17.487px 17.487px 17.487px 0px" : "17.487px 17.487px 0px 17.487px"}
                    margin="6px 0px"
                    minHeight="68px"
                    width="100%"
                > 
                  <ViewComponent comps={comp} />
                </Box>
              </Box>
            </Box>

            {data.type === 'customer_response_node' ? (
              <Box
                  bottom="2"
                  height='35px'
                  left="-12"
                  marginLeft="0px"
                  marginRight="10px"
                  position="absolute"
                  width='35px'
              >
                <CustomerIcon /> 
              </Box>
          ) : (
            <Box
                bottom="2"
                height='35px'
                marginLeft="10px"
                marginRight="0px"
                position="absolute"
                right="-12"
                width='35px'
            >
              <BotIcon />
            </Box>
          )}
          </Box>
        </PopoverTrigger>

        <PopoverContent
            border="1px solid #AADBFF !important"
            boxShadow="0px 4px 12px 0px rgba(0, 0, 0, 0.10)"
            rootProps={{style: {right: 0}}}
        >
          <PopoverCloseButton style={{display: 'none'}} />

          <PopoverArrow />

          <PopoverBody
              paddingBottom="30px"
          >
            <EditComponent
                comps={comp}
                initialRef={initialFocusRef}
                node={data}
                setComp={setComp}
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
          style={{ background: '#fff', border: '1px solid', borderColor: 'hsla(0, 0%, 93%, 1)', top: "auto", marginBottom: '10px' }}
          type="source"
      />
    </>
  );
}

export default WidgetComponent;