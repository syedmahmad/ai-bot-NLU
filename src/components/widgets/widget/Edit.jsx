import React from 'react';
import { Box } from '@chakra-ui/react';
import TextBody from '../../popoverBodies/Text';
import ButtonBody from '../../popoverBodies/Button';
import ImageBody from '../../popoverBodies/Image';
import CalendarBody from '../../popoverBodies/Calender';
import CarousalBody from '../../popoverBodies/Carousal';

function EditComponent({ comps, setComp }) {
  return (
    <Box>
      { 
        comps.map((comp) => {
            switch(comp.name) {
                case 'text':
                    return (
                      <Box
                          margin="10px 0px"
                          width="100%"
                      >
                        <TextBody
                            comp={comp}
                            components={comps}
                            setComp={setComp}
                        />
                      </Box>
                    );
                case 'button':
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
                case 'image':
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
                case 'calendar':
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
                case 'carousel':
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