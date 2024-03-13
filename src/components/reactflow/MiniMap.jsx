import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    Box,
    Text,
    Button
  } from '@chakra-ui/react';
  import {
    ReactFlow, useReactFlow
  } from 'reactflow';
  
  function MiniMapModal(props) {
    const { setViewport } = useReactFlow();
    const { showMiniMap, setShowMiniMap, nodes, edges, nodeTypes } = props;


    return (
      <Modal
          isOpen={showMiniMap}
          onClose={!showMiniMap}
          size="full"
          style={{ cursor: "none" }}
      >
        <ModalOverlay />
  
        <ModalContent
            alignSelf="center"
            display="flex"
            maxW="1400px"
            padding="0px"
        >
  
          <ModalBody>
            <Text
                color="text.body"
                fontSize="lg"
                fontWeight={400}
                margin="5px 0px"
            >
              Flow Diagram
            </Text>

            <Box
                backgroundColor="white"
                border="1px solid"
                borderColor="stroke.menuOrCard"
                height="85vh"
                overflow="hidden"
                position="relative"
                width="100%"
            >
              <ReactFlow
                  edges={edges}
                  elementsSelectable={false}
                  fitView
                  free={false}
                  nodeTypes={nodeTypes}
                  nodes={nodes}
                  nodesConnectable={false}
                  nodesDraggable={false}
                  onInit={() => setViewport({ x: 400, y: 10, zoom: 0.35 }, { duration: 100 })}
                  onPaneClick={() => {}}
                  onPaneScroll={() => {}}
                  panOnDrag={false}
                  panOnScroll={false}
                  proOptions={{ hideAttribution: true }}
                  selectionOnDrag
                  zoomOnScroll={false}  
                  // onMove={handleMove}
              />
            </Box>

            <Button
                _hover={{ backgroundColor: 'primary.90' }}
                backgroundColor="primary.100"
                borderRadius="0.25rem"
                bottom={5}
                color="white"
                height="1.75rem"
                onClick={() => setShowMiniMap(false)}
                position="absolute"
                right={5}
                width="7.375rem"
            >
              Cancel
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  }
  
  export default MiniMapModal;
  