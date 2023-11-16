import { useCallback, useState, useMemo } from 'react';
import { Box, Text } from '@chakra-ui/react';
import uniqid from 'uniqid';
import TextComponent from '../widgets/text/Text';
import ImageComponent from '../widgets/image/Image';
import CalendarComponent from '../widgets/calendar/Calendar';
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
import WidgetControls from './Controls';

function ReactFlowComponent() {
  // once user click on specific node, we need to get that node hash,
  // useReactFlow hook allow us to retrive node based on node id.
  // that's why using this hook.
  const reactFlowInstance = useReactFlow();
  // this holds the selected node data.
  const [selectedNode, setSelectedNode] = useState({});

  // building our custom components type and pass this type to reactFlow
  const nodeTypes = useMemo(
    () => ({
      TextNode: TextComponent,
      ImageNode: ImageComponent,
      CalendarNode: CalendarComponent,
    }),
    [],
  );

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
  // in the start, there will be no edge.
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // this will allow user to interact with graph and execute once user add new node and connect it.
  const onConnect = useCallback(
    (params) => {
      setEdges((eds) => addEdge(params, eds));
    },
    [setEdges],
  );

  // generate new node and connect this newly created node to other nodes via edges.
  const addNewNode = useCallback((nodeType) => {
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
        type: nodeType,
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
  }, []);

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
    <Box
        style={{ width: 'calc(100vw - 10.90rem)', height: 'calc(100vh - 71px)' }}
    >
      <Box
          alignItems="center"
          display="flex"
          height="26px"
      >
        <Box
            alignItems="center"
            backgroundColor="white"
            display="flex"
            height="26px"
            paddingLeft="14px"
            width="100%"
        >
          <Text
              color="text.menu"
              fontFamily="Inter"
              fontSize="sm"
              fontWeight={300}
          >
            Flow Name
          </Text>
        </Box>
      </Box>

      <Box
          display="flex"
          width="100%"
      >
        <Box
            height="calc(100vh - 71px)"
            position="relative"
            width="calc(100% - 26.75rem)"
        >
          <ReactFlow
              edges={edges}
              nodeTypes={nodeTypes}
              nodes={nodes}
              onConnect={onConnect}
              onEdgesChange={onEdgesChange}
              onNodeClick={onNodeClick}
              onNodesChange={onNodesChange}
          >
            {/* <Controls /> */}
            {/* <MiniMap /> */}
            <Background
                backgroundColor="hsla(220, 33%, 98%, 1)"
                variant={BackgroundVariant.Dots}
            />
          </ReactFlow>
        </Box>

        <WidgetControls addNewNode={addNewNode} />

        <Box width="26.75rem">
          <RightSidebar />
        </Box>
      </Box>
    </Box>
  );
}

export default ReactFlowComponent;
