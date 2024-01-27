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
    MiniMap,
  } from 'reactflow';
  
  function MiniMapModal({ showMiniMap, setShowMiniMap }) {
    const nodeColor = (node) => {
        switch (node.data.type) {
          case 'customer_response_node':
            return '#FCD8E0';
          default:
            return '#D1EAFE';
        }
      };
    
    return (
      <Modal
          isOpen={showMiniMap}
          onClose={!showMiniMap}
          size="full"
      >
        <ModalOverlay />
  
        <ModalContent
            alignSelf="center"
            display="flex"
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
                height="80vh"
                overflow="hidden"
                position="relative"
                width="100%"
            >
              <MiniMap
                  fill="white"
                  nodeColor={nodeColor}
                  nodeStrokeWidth={3}
                  pannable
                  style={{
                    top: "0",
                    left: "0",
                    margin: "0",
                    padding: "0",
                    border: '1px solid red',
                    width: '1440',
                    height: '1000',
                    fill: 'white',
                    
                    }}
                  zoomable
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
  