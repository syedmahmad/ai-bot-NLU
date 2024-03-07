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
  useStore,
  ControlButton,
  BackgroundVariant
} from 'reactflow';
import RightSidebar from '../rightSidebar';
import WidgetControls from './Controls';
import { botNodeValidations, customerNodeValidations, logicNodeValidations } from '../../utils';
import { useWidgets } from '../context/WidgetsContext';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import MiniMap from './MiniMap';

function ReactFlowComponent() {
  const [currentNode, setCurrentNode] = useState(null);
  const [ showMiniMap, setShowMiniMap ] = useState(false);
  const { zoomIn, zoomOut } = useReactFlow();
  const [ randomOpr, setRandomOpr ] = useState('plus');
  const zoomLevel = useStore((store) => store.transform[2]);
  const isMaxZoom = useStore((store) => store.transform[2] === store.maxZoom);
  const isMinZoom = useStore((store) => store.transform[2] === store.minZoom);
 
  const { addWidget, updateSelectedComp } = useWidgets();
  const {pathname} = useLocation();
  // once user click on specific node, we need to get that node hash,
  // useReactFlow hook allow us to retrive node based on node id.
  // that's why using this hook.
  const reactFlowInstance = useReactFlow();
  // this holds the selected node data.
  const [selectedNode, setSelectedNode] = useState({});

  // building our custom components type and pass this type to reactFlow
  // Everytime we decided to add new custom node, we need to add here the types.
  // Otherwise, reactFlow does not understand our new node.
  const nodeTypes = useMemo(
    () => ({
      bot_response_node: BotComponent,
      customer_response_node: BotComponent,
      logic_response_node: BotComponent
    }),
    [],
  );

  useEffect(() => {
    // Find the parent element by its data-testid
    var parentElement = document.querySelector('[data-testid="rf__minimap"]');

    // Find the SVG element within the parent
    var svgElement = parentElement.querySelector('svg');

    // Change the height attribute
    svgElement.setAttribute('height', 'inherit'); 
    svgElement.style.maxHeight = '285px';
  }, []);

  // onpage load, reading the exsitng flow.
  useEffect(() => {
    fetchDocument();
  }, []);

  const fetchDocument = async () => {
    const result = await fetch(`${import.meta.env.VITE_API_URL}/flow_document/${pathname.split('/')[2]}`);
    const res = await result.json();
    setCurrentNode(res);
    if (res?.edges?.length === 0 && res?.nodes?.length === 0) {
      return 
    }
    const {newEdges, newNodes} = prepareDataForReactFlow(res, onNodeClick, selectedNode);
    // set the edges and nodes that can we display in reactflow..
    setEdges(newEdges);
    setNodes(newNodes);
  }

  const id = mongoObjectId();
  // this is the node structure that reactflow accpet so make sure, all custom nodes 
  // should have the same kind of structure. 
  // Fortunately, in the below obj, you can see "data" attribute, which is customizeable
  // in this data object, we can create any structure, we would like to create.
  // you may see this *connectNewNode* function, here we are passing multiple things in
  // data obj, these all properties we can access in our custom node to do numerous oprations.
  const [nodes, setNodes, onNodesChange] = useNodesState([
    {
      id: id,
      type: 'input',
      position: { x: 700, y: 10 },
      data: { 
        label: <Box
            alignItems="center"
            backgroundColor="white"
            border="1px solid"
            borderColor="secondary.20"
            borderRadius="5px"
            color="text.body"
            data-id={id}
            display="flex"
            fontFamily="Inter"
            fontSize="21px"
            fontWeight={400}
            height={54}
            justifyContent="center"
            width={164}
               >
          Start Flow
        </Box>,
        type: 'start',
     },
      style: {
        width: 184,
        height: 82,
        borderRadius: '6px',
        padding: '9px 10px',
        backgroundColor: 'rgb(170, 219, 255, 0.20)',
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
    // calculating dynamic postion of new node so there will be miminum overlaping occure.
    const position = { 
      x: (randomOpr === 'plus') ? selectedNode.position.x + (Math.random()* 500) : selectedNode.position.x - (Math.random()* 500),
      y: (selectedNode.height + selectedNode.position.y) + Math.floor(Math.random()* (400-200+1)+200)
    };
    // concatinating new node with previous node
    setNodes((prev) => {
      return prev.concat({
        id: newNodeId,
        type: type,
        position: position,
        // in this data obj, we can pass any properties to our custom node, all other properties
        // will not pass that's why we need type and other properties.
        // type: used for styling
        // type : bot_response_node: BotComponent,
        //        customer_response_node: BotComponent,
        //        logic_response_node: BotComponent
        // sourceHandle: used to connect old nodes with new nodes.
        // onNodeClick: need to collect current selected node data.
        // widgetName: In bot response, we can have multiple types of widgets.
        // components: One bot node, can have multiple widgets, so we are maintaining the array
        // in custom node
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
    switch(randomOpr) {
      case 'plus':
        setRandomOpr('minus');
        return;
      default:
        setRandomOpr('plus');
        return;
    }
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

  const addLogic = () => {
    if (logicNodeValidations(selectedNode)) {
      const newId = mongoObjectId();
      // its default type is "TextNode", we may decide later if wanted to update it.
      connectNewNode(newId, "logic_response_node", "logic_widget");
    }
  }

  // need to store selected node data, that's why needed this callback.
  const onNodeClick = useCallback(
    (event) => {
      // if (event?.target?.getAttribute('data-id')) {
        updateSelectedComp(reactFlowInstance.getNode(event?.target?.getAttribute('data-id'))?.id);
        setSelectedNode(
          reactFlowInstance.getNode(event?.target?.getAttribute('data-id')),
        );
      // }
    },
    [reactFlowInstance],
  );

  const onPaneClick = async () => {
    const data11 = prepareDataForAPIs(edges, nodes, currentNode);
    setTimeout(() => {
      document.getElementsByClassName('chakra-popover__close-btn')[0].click();
    }, 50);
    await axios.put(
      `${import.meta.env.VITE_API_URL}/flow_document/${data11.id}`,
      data11
    );
  }

  // this will remove the watermark
  const proOptions = { hideAttribution: true };
  return (
    <Box
        style={{ width: 'calc(100vw - 10.90rem)', height: 'calc(100vh - 71px)' }}
    >
      <Box
          alignItems="center"
          display="flex"
          height="47px"
      >
        <Box
            alignItems="center"
            backgroundColor="white"
            display="flex"
            height="47px"
            paddingLeft="14px"
            width="100%"
        >
          <Text
              color="text.menu"
              fontFamily="Inter"
              fontSize="lg"
              fontWeight={300}
          >
            {currentNode?.name}
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
              proOptions={proOptions}
          >
            <Controls
                className={[
                isMaxZoom ? "zoom-in-disabled" : "",
                isMinZoom ? "zoom-out-disabled" : ""
              ].join(" ")}
                showFitView={false}
                showInteractive={false} 
                showZoom={false}
                style={{display: 'flex', width: '106px', height: '28px', borderRadius: '4px', bottom: '25px', boxShadow: 'none', border: '1px solid #ECECEC', background: '#FFFFFF'}}
            >
              <ControlButton
                  className={`react-flow__controls-zoomin ${isMaxZoom ? 'zoom-in-disabled' : ''}`}
                  disabled={isMaxZoom}
                  onClick={() => zoomIn()}
                  style={{ background: 'transparent' }}
              >
                +
              </ControlButton>

              <ControlButton style={{ background: 'hsla(203, 19%, 92%, 0.4)', width: '35px', height: '16px', margin: '6px', padding: 0, color: '#858585', textAlign: 'center', fontFamily: 'Inter', fontSize: '8px', fontWeight: 400 }}>
                {`${Math.round(zoomLevel * 100)}%` } 
              </ControlButton>

              <ControlButton
                  className={`react-flow__controls-zoomout ${isMinZoom ? 'zoom-out-disabled' : ''}`}
                  disabled={isMinZoom}
                  onClick={() => zoomOut()}
                  style={{ background: 'transparent' }}
              >
                -
              </ControlButton>
            </Controls>

            <Background
                backgroundColor="hsla(220, 33%, 98%, 1)"
                variant={BackgroundVariant.Dots}
            />
          </ReactFlow>

          <WidgetControls 
              addBotNode={addBotNode} 
              addCustomerNode={addCustomerNode}
              addLogic={addLogic}
          />
          
        </Box>

        <Box width="26.75rem">
          <RightSidebar 
              setShowMiniMap={setShowMiniMap}
          />
        </Box>

        <MiniMap 
            edges={edges} 
            id="my-mini-svg"
            nodeTypes={nodeTypes}
            nodes={nodes}
            setShowMiniMap={setShowMiniMap}
            showMiniMap={showMiniMap}
        />
      </Box>
    </Box>
  );
}

export default ReactFlowComponent;
