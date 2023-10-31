import { useCallback, useState } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  MarkerType,
} from 'reactflow';
import uniqid from 'uniqid';
import 'reactflow/dist/style.css';

export default function App() {
  // once user click on specific node, we need to get that node hash,
  // useReactFlow hook allow us to retrive node based on node id.
  // that's why using this hook.
  const reactFlowInstance = useReactFlow();
  // this holds the selected node data.
  const [selectedNode, setSelectedNode] = useState({});

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
    // return if there is no node selected and user clicks on wdiget.
    if (Object.keys(selectedNode).length === 0) {
      alert(
        'Before clicking on any widget. Please select either *Start Flow* button if you are creating *New Flow*. Otherwise click on specific node from where you wanted to create more (expand).',
      );
      return;
    }
    const newId = uniqid();
    setNodes((prev) => {
      return prev.concat({
        id: newId,
        // type: 'selectorNode',
        position: { x: 700, y: selectedNode.position.y + 50 },
        data: { label: selectedNode.data.label },
        style: {
          backgroundColor: '#fffff',
        },
      });
    });
    setEdges((prev) => {
      return prev.concat({
        id: `e${selectedNode.id}-${newId}`,
        source: selectedNode.id,
        target: newId,
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
    <div className="body" style={{ width: '100vw', height: '100vh' }}>
      <button onClick={addNewNode} style={{ backgroundColor: '#4CAF50' }}>
        Add new node
      </button>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
      >
        <Controls />
        <MiniMap />
        <Background color="#F9FAFC" variant="dots" />
      </ReactFlow>
    </div>
  );
}
