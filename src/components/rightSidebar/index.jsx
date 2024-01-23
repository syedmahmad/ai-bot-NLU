/* eslint-disable */
import { Box, Text, Select, Input } from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import {
  MiniMap,
  Controls
} from 'reactflow';

function RightSidebar() {
  const nodeColor = (node) => {
    // if (node.type === 'input') {
    //     return '#D1EAFE';
    // }
    // console.log("node.data.nodeType", node.data);
    switch (node.data.type) {
      case 'customer_response_node':
        return '#FCD8E0';
      default:
        return '#D1EAFE';
    }
  };
  return (
    <Box
        height="calc(100vh - 71px)"
        width="100%"
    >
      <Box
          alignItems="center"
          backgroundColor="secondary.10"
          border="1px sollid"
          borderColor="stroke.table"
          display="flex"
          height="2.625rem"
          justifyContent="space-between"
          padding="0px 12px"
          width="100%"
      >
        <Box width="100px">
          <Text
              color="text.menu"
              fontFamily="Inter"
              fontSize="sm"
              fontWeight={300}
          >
            Flow Diagram
          </Text>
        </Box>

        <Box
            alignItems="center"
            backgroundColor="white"
            borderRadius="3px"
            cursor="pointer"
            display="flex"
            height="1.375rem"
            justifyContent="center"
            width="1.375rem"
        >
          <Icon
              color="hsla(0, 0%, 52%, 1)"
              icon="lucide:expand"
          ><Controls showZoom={false} showFitView={false} /></Icon>
        </Box>
      </Box>

      <Box
          backgroundColor="white"
          border="1px solid"
          borderColor="stroke.menuOrCard"
          height="calc(55vh - 113px)"
          position="relative"
          width="100%"

      >
        <MiniMap
            nodeColor={nodeColor}
            nodeStrokeWidth={3}
            fill="white"
            style={{
              top: "0",
              left: "0",
              margin: "0",
              padding: "0",
              width: '430',
              height: '275',
              fill: 'white'
            }}
            pannable
            zoomable
        />
      </Box>

      <Box
          alignItems="center"
          backgroundColor="secondary.10"
          border="1px sollid"
          borderColor="stroke.table"
          display="flex"
          height="2.625rem"
          justifyContent="space-between"
          padding="0px 12px"
          width="100%"
      >
        <Box width="100px">
          <Text
              color="text.menu"
              fontFamily="Inter"
              fontSize="sm"
              fontWeight={300}
          >
            Test
          </Text>
        </Box>

        <Box
            alignItems="center"
            display="flex"
        >
          <Box
              height="1.375rem"
              marginRight="10px"
              width="10.75rem"
          >
            <Select
                backgroundColor="white"
                color="text.menu"
                height="1.75rem"
                marginTop="-3px"
                placeholder="Select Channel"
                width="10.75rem"
            >
              <option value="option1">
                Option 1
              </option>

              <option value="option2">
                Option 2
              </option>

              <option value="option3">
                Option 3
              </option>
            </Select>
          </Box>

          <Box
              alignItems="center"
              backgroundColor="white"
              borderRadius="3px"
              cursor="pointer"
              display="flex"
              height="1.375rem"
              justifyContent="center"
              width="1.375rem"
          >
            <Icon
                color="hsla(0, 0%, 52%, 1)"
                icon="tabler:reload"
            />
          </Box>
        </Box>
      </Box>

      <Box
          backgroundColor="white"
          border="1px solid"
          borderColor="stroke.menuOrCard"
          height="calc(45vh - 2.625rem)"
          width="100%"
      >
        <Box
            alignItems="center"
            bottom={2}
            display="flex"
            paddingLeft="14px"
            position="fixed"
            width="26.75rem"
        >
          <Box
              marginRight="10px"
              width="21.5625rem"
          >
            <Input
                placeholder="Type here"
                size="lg"
            />
          </Box>

          <Box
              cursor="pointer"
              marginLeft="10px"
              width="20px"
          >
            <Icon
                color="hsla(349, 100%, 67%, 1)"
                icon="fluent:send-32-regular"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default RightSidebar;


