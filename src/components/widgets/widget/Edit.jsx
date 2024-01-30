import React from 'react';
import { Box } from '@chakra-ui/react';
import TextBody from '../../popoverBodies/Text';
import ButtonBody from '../../popoverBodies/Button';
import ImageBody from '../../popoverBodies/Image';
import CalendarBody from '../../popoverBodies/Calender';
import CarousalBody from '../../popoverBodies/Carousal';
import LogicBody from '../../popoverBodies/Logic';

function EditComponent({ initialRef, comps, setComp, node }) {
  return (
    <Box>
      { 
        comps.map((comp) => {
            switch(comp.type) {
                case 'logic_widget':
                    return (
                      <Box
                          margin="10px 0px"
                          width="100%"
                      >
                        <LogicBody
                            comp={comp}
                            components={comps}
                            setComp={setComp}
                        />
                      </Box>
                    );
                case 'text_widget':
                    return (
                      <Box
                          margin="10px 0px"
                          width="100%"
                      >
                        <TextBody
                            comp={comp}
                            components={comps}
                            ref={initialRef}
                            setComp={setComp}
                            type={node.type}
                        />
                      </Box>
                    );
                case 'button_widget':
                    return (
                      <Box
                          margin="10px 0px"
                          width="100%"
                      >
                        <ButtonBody
                            comp={comp}
                            components={comps}
                            setComp={setComp}
                        />
                      </Box>
                    );
                case 'image_widget':
                    return (
                      <Box
                          margin="10px 0px"
                          width="100%"
                      >
                        <ImageBody
                            comp={comp}
                            components={comps}
                            setComp={setComp}
                        />
                      </Box>
                    );
                case 'calendar_widget':
                    return  (
                      <Box
                          margin="10px 0px"
                          width="100%"
                      >
                        <CalendarBody
                            comp={comp}
                            components={comps}
                            setComp={setComp}
                        />
                      </Box>
                    );
                case 'carousel_widget':
                    return (
                      <Box
                          margin="10px 0px"
                          width="100%"
                      >
                        <CarousalBody
                            comp={comp}
                            components={comps}
                            setComp={setComp}
                        />
                      </Box>
                    );
                default:
                    return null;
            }
        })
  }
    </Box>
  );
}

export default EditComponent;