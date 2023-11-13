import { useCallback, useState, useMemo } from 'react';
import { Box, Text } from '@chakra-ui/react';
import uniqid from 'uniqid';
import CustomNodeComponent from '../../CustomNodeComponent';
import { Icon } from '@iconify/react';
import ReactFlow, {
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  MarkerType,
  BackgroundVariant,
} from 'reactflow';
import RightSidebar from '../rightSidebar';

export const ReactFlowComponent = () => {
  // once user click on specific node, we need to get that node hash,
  // useReactFlow hook allow us to retrive node based on node id.
  // that's why using this hook.
  const reactFlowInstance = useReactFlow();
  // this holds the selected node data.
  const [selectedNode, setSelectedNode] = useState({});
  const [openWidget, setOpenWidget] = useState(false);
  // building our custom components type and pass this type to reactFlow
  const nodeTypes = useMemo(() => ({ specialNode: CustomNodeComponent }), []);

  const [nodes, setNodes, onNodesChange] = useNodesState([
    {
      id: uniqid(),
      type: 'input',
      position: { x: 700, y: 10 },
      data: { label: 'Start Flow' },
      style: {
        backgroundColor: '#fff',
        boxShadow: '#AADBFF',
      },
      background: '#D1EAFE',
    },
  ]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // this will allow user to interact with graph and execute once user add new node and connect it.
  const onConnect = useCallback(
    (params) => {
      setEdges((eds) => addEdge(params, eds));
    },
    [setEdges],
  );

  // generate new node and connect this newly created node to other nodes via edges.
  const addNewNode = () => {
    console.log('selectedNode', selectedNode);
    // return if there is no node selected and user clicks on wdiget.
    if (!selectedNode || Object.keys(selectedNode).length === 0) {
      alert(
        'Before clicking on any widget. Please select either *Start Flow* button if you are creating *New Flow*. Otherwise click on specific node from where you wanted to create more (expand).',
      );
      return;
    }
    const newId = uniqid();
    setNodes((prev) => {
      return prev.concat({
        id: newId,
        type: 'specialNode',
        position: { x: 700, y: selectedNode.position.y + 200 },
        data: {
          label: `hello`,
          sourceHandle: newId,
          onNodeClick: onNodeClick,
        },
        style: {
          backgroundColor: '#000',
          boxShadow: '#AADBFF',
        },
        background: '#000',
      });
    });
    setEdges((prev) => {
      // in the edges, normally we use the "id of a node" for the source or target of an edge
      return prev.concat({
        id: `e${selectedNode.id}-${newId}`,
        source: selectedNode.id,
        target: newId,
        sourceHandle: newId,
        // to show the arrows in connection instead of dot.
        markerEnd: {
          type: MarkerType.Arrow,
          width: 30,
          height: 30,
          color: '#D8D8D8',
        },
        style: { stroke: '#D8D8D8' },
        // label: 'Bot'
      });
    });
    // reset selected node.
    setSelectedNode({});
  };

  // need to store selected node data, that's why needed this callback.
  const onNodeClick = useCallback(
    (event) => {
      setSelectedNode(
        reactFlowInstance.getNode(event?.target?.getAttribute('data-id')),
      );
    },
    [reactFlowInstance],
  );

  return (
    <Box style={{ width: 'calc(100vw - 10.90rem)', height: 'calc(100vh - 71px)' }}>
      <Box display={'flex'} height={'26px'} alignItems={'center'}>
        {/* <Box width={'20%'}>
          <button onClick={addNewNode} style={{ backgroundColor: '#4CAF50', height: '26px', width: '100%' }}>
            Add new node
          </button>
        </Box> */}
        <Box
          width={'100%'}
          backgroundColor={'white'}
          height={'26px'}
          display={'flex'}
          alignItems={'center'}
          paddingLeft={'14px'}
        >
          <Text
            color={'text.menu'}
            fontSize={'sm'}
            fontWeight={300}
            fontFamily={'Inter'}
          >
            Flow Name
          </Text>
        </Box>
      </Box>
      <Box display={'flex'} width={'100%'}>
        <Box
          width={'calc(100% - 26.75rem)'}
          height={'calc(100vh - 71px)'}
          position={'relative'}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypes}
            // fitView
          >
            {/* <Controls /> */}
            {/* <MiniMap /> */}
            <Background
              backgroundColor="hsla(220, 33%, 98%, 1)"
              variant={BackgroundVariant.Dots}
            />
          </ReactFlow>
          <Box
            position={'absolute'}
            height={'23.4375rem'}
            width={'3.5rem'}
            top={10}
            right={5}
          >
            <Box
              cursor={'pointer'}
              height={'fit-content'}
              padding={'0.85rem 0.5rem'}
              backgroundColor={'white'}
              display={'flex'}
              flexDirection={'column'}
              alignContent={'center'}
              justifyContent={'center'}
              width={'3.5rem'}
              boxShadow={'0px 4px 10px 0px rgba(0, 0, 0, 0.06)'}
              borderRadius={'0.3125rem'}
            >
              <Box width={'100%'} display={'flex'} justifyContent={'center'}>
                <Icon icon="tdesign:chat" />
              </Box>
              <Box marginTop={2}>
                <Text
                  fontSize={'8px'}
                  align={'center'}
                  fontWeight={400}
                  fontFamily={'Inter'}
                >
                  Customer Response
                </Text>
              </Box>
            </Box>
            <br />
            <Box
              backgroundColor={'white'}
              width={'3.5rem'}
              padding={'0.85rem 0px'}
              paddingTop={0}
              boxShadow={'0px 4px 10px 0px rgba(0, 0, 0, 0.06)'}
              borderRadius={'0.3125rem'}
              onClick={() => setOpenWidget(!openWidget)}
            >
              <Box
                cursor={'pointer'}
                height={'fit-content'}
                padding={'0.85rem 0.5rem'}
                paddingBottom={0}
                display={'flex'}
                flexDirection={'column'}
                alignContent={'center'}
                justifyContent={'center'}
              >
                <Box width={'100%'} display={'flex'} justifyContent={'center'}>
                  <Icon icon="solar:widget-4-linear" />
                </Box>
                <Box marginTop={2}>
                  <Text
                    fontSize={'8px'}
                    align={'center'}
                    fontWeight={400}
                    fontFamily={'Inter'}
                  >
                    Widgets
                  </Text>
                </Box>
              </Box>
              <Box
                cursor={'pointer'}
                height={'fit-content'}
                padding={'0.85rem 0.5rem'}
                paddingBottom={0}
                display={'flex'}
                flexDirection={'column'}
                alignContent={'center'}
                justifyContent={'center'}
              >
                <Box width={'100%'} display={'flex'} justifyContent={'center'}>
                  <Icon icon="carbon:flow" />
                </Box>
                <Box marginTop={2}>
                  <Text
                    fontSize={'8px'}
                    align={'center'}
                    fontWeight={400}
                    fontFamily={'Inter'}
                  >
                    Logic
                  </Text>
                </Box>
              </Box>
              <Box
                cursor={'pointer'}
                height={'fit-content'}
                padding={'0.85rem 0.5rem'}
                paddingBottom={0}
                display={'flex'}
                flexDirection={'column'}
                alignContent={'center'}
                justifyContent={'center'}
              >
                <Box width={'100%'} display={'flex'} justifyContent={'center'}>
                  <Icon icon="carbon:show-data-cards" />
                </Box>
                <Box marginTop={2}>
                  <Text
                    fontSize={'8px'}
                    align={'center'}
                    fontWeight={400}
                    fontFamily={'Inter'}
                  >
                    Forms
                  </Text>
                </Box>
              </Box>
              <Box
                cursor={'pointer'}
                height={'fit-content'}
                padding={'0.85rem 0.5rem'}
                paddingBottom={0}
                display={'flex'}
                flexDirection={'column'}
                alignContent={'center'}
                justifyContent={'center'}
              >
                <Box width={'100%'} display={'flex'} justifyContent={'center'}>
                  <Icon icon="ant-design:node-index-outlined" />
                </Box>
                <Box marginTop={2}>
                  <Text
                    fontSize={'8px'}
                    align={'center'}
                    fontWeight={400}
                    fontFamily={'Inter'}
                  >
                    Actions
                  </Text>
                </Box>
              </Box>
              <Box
                cursor={'pointer'}
                height={'fit-content'}
                padding={'0.85rem 0.5rem'}
                paddingBottom={0}
                display={'flex'}
                flexDirection={'column'}
                alignContent={'center'}
                justifyContent={'center'}
              >
                <Box width={'100%'} display={'flex'} justifyContent={'center'}>
                  <Icon icon="iconamoon:profile-light" />
                </Box>
                <Box marginTop={2}>
                  <Text
                    fontSize={'8px'}
                    align={'center'}
                    fontWeight={400}
                    fontFamily={'Inter'}
                  >
                    Agent Handover
                  </Text>
                </Box>
              </Box>
            </Box>
          </Box>
          {/*  */}
          {openWidget && (
            <Box
              position={'absolute'}
              height={'23.4375rem'}
              width={'3.5rem'}
              top={'160px'}
              right={'135px'}
            >
              <Box
                backgroundColor={'white'}
                width={'6.625rem'}
                padding={'0.85rem 0px'}
                paddingTop={0}
                boxShadow={'0px 4px 10px 0px rgba(0, 0, 0, 0.06)'}
                borderRadius={'0.3125rem'}
                onClick={addNewNode}
              >
                <Box
                  cursor={'pointer'}
                  height={'fit-content'}
                  padding={'0.85rem 1.06rem'}
                  paddingBottom={0}
                  display={'flex'}
                  alignItems={'center'}
                >
                  <Box width={'32px'} display={'flex'}>
                    <Icon icon="mdi:text" />
                  </Box>
                  <Box display={'flex'}>
                    <Text
                      fontSize={'8px'}
                      align={'center'}
                      fontWeight={400}
                      fontFamily={'Inter'}
                    >
                      Text
                    </Text>
                  </Box>
                </Box>
                <Box
                  cursor={'pointer'}
                  height={'fit-content'}
                  padding={'0.85rem 1.06rem'}
                  paddingBottom={0}
                  display={'flex'}
                  alignItems={'center'}
                >
                  <Box width={'32px'} display={'flex'}>
                    <Icon icon="teenyicons:button-outline" />
                  </Box>
                  <Box display={'flex'}>
                    <Text
                      fontSize={'8px'}
                      align={'center'}
                      fontWeight={400}
                      fontFamily={'Inter'}
                    >
                      Button
                    </Text>
                  </Box>
                </Box>
                <Box
                  cursor={'pointer'}
                  height={'fit-content'}
                  padding={'0.85rem 1.06rem'}
                  paddingBottom={0}
                  display={'flex'}
                  alignItems={'center'}
                >
                  <Box width={'32px'} display={'flex'}>
                    <Icon icon="ic:outline-image" />
                  </Box>
                  <Box display={'flex'}>
                    <Text
                      fontSize={'8px'}
                      align={'center'}
                      fontWeight={400}
                      fontFamily={'Inter'}
                    >
                      Image
                    </Text>
                  </Box>
                </Box>
                <Box
                  cursor={'pointer'}
                  height={'fit-content'}
                  padding={'0.85rem 1.06rem'}
                  paddingBottom={0}
                  display={'flex'}
                  alignItems={'center'}
                >
                  <Box width={'32px'} display={'flex'}>
                    <Icon icon="bi:card-text" />
                  </Box>
                  <Box display={'flex'}>
                    <Text
                      fontSize={'8px'}
                      align={'center'}
                      fontWeight={400}
                      fontFamily={'Inter'}
                    >
                      Carousel
                    </Text>
                  </Box>
                </Box>
                <Box
                  cursor={'pointer'}
                  height={'fit-content'}
                  padding={'0.85rem 1.06rem'}
                  paddingBottom={0}
                  display={'flex'}
                  alignItems={'center'}
                >
                  <Box width={'32px'} display={'flex'}>
                    <Icon icon="octicon:calendar-24" />
                  </Box>
                  <Box display={'flex'}>
                    <Text
                      fontSize={'8px'}
                      align={'center'}
                      fontWeight={400}
                      fontFamily={'Inter'}
                    >
                      Calendar
                    </Text>
                  </Box>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
        <Box width={'26.75rem'}>
          <RightSidebar />
        </Box>
      </Box>
    </Box>
  );
};
