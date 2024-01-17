/* eslint-disable */
import { useCallback, useState, useMemo, useEffect } from 'react';
import { prepareDataForAPIs, prepareDataForReactFlow } from '../../utils/parser';
import { mongoObjectId } from '../../utils/index';
import { Box, Text } from '@chakra-ui/react';
import BotComponent from '../widgets/widget/Index';

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
  const { addWidget, updateSelectedComp } = useWidgets();
  const {pathname} = useLocation();
  // once user click on specific node, we need to get that node hash,
  // useReactFlow hook allow us to retrive node based on node id.
  // that's why using this hook.
  const reactFlowInstance = useReactFlow();
  // this holds the selected node data.
  const [selectedNode, setSelectedNode] = useState({});

  // building our custom components type and pass this type to reactFlow
  const nodeTypes = useMemo(
    () => ({
      bot_response_node: BotComponent,
      customer_response_node: BotComponent
    }),
    [],
  );
  const { data: document } = useQuery({
    queryFn: () => axios
    .get(`${import.meta.env.VITE_API_URL}/flow_document/${pathname.split('/')[2]}`)
    .then((res) => res.data),
  });

  useEffect(() => {
    if (document) {
      if (document?.edges?.length === 0 && document?.nodes?.length === 0) {
        return 
      };
      const {newEdges, newNodes} = prepareDataForReactFlow(document, onNodeClick, selectedNode);
      // set the edges and nodes that can we display in reactflow..
      setEdges(newEdges);
      setNodes(newNodes);
    }
  }, [document]);

  const id = mongoObjectId();
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
        backgroundColor: '#AADBFF',
        borderColor: '#ECECEC'
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

  const connectNewNode = (newNodeId, type, widgetName) => {
    setNodes((prev) => {
      return prev.concat({
        id: newNodeId,
        type: type,
        position: { x: 700, y: selectedNode.position.y + 200 },
        data: {
          // type: type === "bot" ? widgetName : type,
          type: type,
          sourceHandle: newNodeId,
          onNodeClick: onNodeClick,
          selectedNode: selectedNode,
          widgetName: widgetName,
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
        // id: `e${selectedNode.id}-${newNodeId}`,
        id: mongoObjectId(),
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
    if (selectedNode?.type === "bot_response_node") {
      // via context, we will add widget to same bot node as there is no other 
      // communication medium.
      addWidget(widgetName);
      return;
    }

    // we'll not create same bot response again if parent is already bot.
    if (botNodeValidations(selectedNode)) {
      const newId = mongoObjectId();
      connectNewNode(newId, "bot_response_node", widgetName);
    }
  }

  const addCustomerNode = () => {
    if (customerNodeValidations(selectedNode)) {
      const newId = mongoObjectId();
      // its default type is "TextNode", we may decide later if wanted to update it.
      connectNewNode(newId, "customer_response_node", "text_widget");
    }
  }

  // need to store selected node data, that's why needed this callback.
  const onNodeClick = useCallback(
    (event) => {
      updateSelectedComp(reactFlowInstance.getNode(event?.target?.getAttribute('data-id')).id);
      setSelectedNode(
        reactFlowInstance.getNode(event?.target?.getAttribute('data-id')),
      );
    },
    [reactFlowInstance],
  );

  const onPaneClick = async () => {
    const data11 = prepareDataForAPIs(edges, nodes, document);
    const res = await axios.put(
      `${import.meta.env.VITE_API_URL}/flow_document/${data11.id}`,
      data11
    );
    console.log('DataToSave', res);
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
              fontSize="lg"
              fontWeight={300}
          >
            {document?.name}
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
