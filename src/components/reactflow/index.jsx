/* eslint-disable */
import { useCallback, useState, useMemo } from 'react';
import { Box, Text } from '@chakra-ui/react';
import uniqid from 'uniqid';
import BotComponent from '../widgets/widget/Index';
import { useMutation } from '@tanstack/react-query';

import ReactFlow, {
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  MarkerType,
  Controls,
  BackgroundVariant,
} from 'reactflow';
import RightSidebar from '../rightSidebar';
import WidgetControls from './Controls';
import { botNodeValidations, customerNodeValidations } from '../../utils';
import { useWidgets } from '../context/WidgetsContext';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

function ReactFlowComponent() {
  const { addWidget } = useWidgets();
  const {pathname} = useLocation();
  const { data } = useQuery({
    queryFn: () => axios
    .get(`http://54.81.9.89/flow_entity/{id}?_id=${pathname.split('/')[2]}&include_deleted=false`)
    .then((res) => res.data),
  });

  const mutation = useMutation({
    mutationFn: (data) => {
      // eslint-disable
      // debugger;
      return axios.put(
        `http://54.81.9.89/flow_entity/{id}?_id=${pathname.split('/')[2]}`,
        data,
      );
    },
  });

  // once user click on specific node, we need to get that node hash,
  // useReactFlow hook allow us to retrive node based on node id.
  // that's why using this hook.
  const reactFlowInstance = useReactFlow();
  // this holds the selected node data.
  const [selectedNode, setSelectedNode] = useState({});

  // building our custom components type and pass this type to reactFlow
  const nodeTypes = useMemo(
    () => ({
      bot: BotComponent,
      customer: BotComponent
    }),
    [],
  );

  const id = uniqid();
  const [nodes, setNodes, onNodesChange] = useNodesState([
    {
      id: id,
      type: 'input',
      position: { x: 700, y: 10 },
      data: { 
        label: <Box data-id={id} fontFamily={"Inter"} fontSize={"21px"} fontWeight={400} color={"text.body"} border={"1px solid"} borderColor={"secondary.20"} borderRadius={"5px"} backgroundColor={"white"} width={164} height={54} display={"flex"} justifyContent={"center"} alignItems={"center"}>Start Flow</Box>,
        type: 'start',
     },
      style: {
        width: 184,
        height: 82,
        padding: '9px 10px',
        backgroundColor: 'hsla(205, 100%, 83%, 0.17)',
        borderColor: '#fff'
      },
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
  // console.log(nodes);
  const connectNewNode = (newNodeId, type, widgetName) => {
    setNodes((prev) => {
      return prev.concat({
        id: newNodeId,
        type: type,
        position: { x: 700, y: selectedNode.position.y + 200 },
        data: {
          type: type === "bot" ? widgetName : type,
          sourceHandle: newNodeId,
          onNodeClick: onNodeClick,
          components: []
        },
        style: {
          backgroundColor: 'transparent',
          boxShadow: '#AADBFF',
        },
        background: 'transparent',
      });
    });
    setEdges((prev) => {
      // in the edges, normally we use the "id of a node" for the source or target of an edge
      return prev.concat({
        id: `e${selectedNode.id}-${newNodeId}`,
        source: selectedNode.id,
        target: newNodeId,
        sourceHandle: newNodeId,
        // to show the arrows in connection instead of dot.
        markerEnd: {
          type: MarkerType.Arrow,
          width: 30,
          height: 30,
          color: '#D8D8D8',
        },
        style: { stroke: '#D8D8D8' },
      });
    });
    // reset selected node.
    setSelectedNode({});
  }

  // generate new node and connect this newly created node to other nodes via edges.
  const addBotNode = (widgetName) => {
    if (selectedNode?.type === "bot") {
      // via context, we will add widget to same bot node as there is no other 
      // communication medium.
      addWidget(widgetName);
      return;
    }

    // we'll not create same bot response again if parent is already bot.
    if (botNodeValidations(selectedNode)) {
      const newId = uniqid();
      connectNewNode(newId, "bot", widgetName);
    }
  }

  const addCustomerNode = () => {
    if (customerNodeValidations(selectedNode)) {
      const newId = uniqid();
      // its default type is "TextNode", we may decide later if wanted to update it.
      connectNewNode(newId, "customer", "text");
    }
  }

  // need to store selected node data, that's why needed this callback.
  const onNodeClick = useCallback(
    (event) => {
      setSelectedNode(
        reactFlowInstance.getNode(event?.target?.getAttribute('data-id')),
      );
    },
    [reactFlowInstance],
  );

  const onPaneClick = () => {
    console.log('onPaneClick', nodes);
    // mutation.mutate(
    //   {
    //     nodes
    //   },
    //   {
    //     onSuccess: async () => {
    //       toast.success("Flow edited successfully");
    //     },
    //   },
    // )
  }

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
            {data?.name}
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
              onPaneClick={onPaneClick}
          >
            <Controls />
            <Background
                backgroundColor="hsla(220, 33%, 98%, 1)"
                variant={BackgroundVariant.Dots}
            />
          </ReactFlow>
          <WidgetControls addCustomerNode={addCustomerNode} addBotNode={addBotNode} />
        </Box>

        <Box width="26.75rem">
          <RightSidebar 
            edges={edges}
            nodes={nodes} />
        </Box>
      </Box>
    </Box>
  );
}

export default ReactFlowComponent;
