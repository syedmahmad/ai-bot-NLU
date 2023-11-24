import React from 'react';
import { Box } from '@chakra-ui/react';
import TextBody from '../../popoverBodies/Text';
import ButtonBody from '../../popoverBodies/Button';
import ImageBody from '../../popoverBodies/Image';
import CalendarBody from '../../popoverBodies/Calender';

function EditComponent({ comps, setComp }) {
  return (
    <>
      { 
        comps.map((comp) => {
            switch(comp.name) {
                case 'text':
                    return (
                      <TextBody
                          comp={comp}
                          components={comps}
                          setComp={setComp}
                      />
                    );
                case 'button':
                    return (
                      <ButtonBody
                          comp={comp}
                          components={comps}
                          setComp={setComp}
                      />
                    );
                case 'image':
                    return (
                      <ImageBody
                          comp={comp}
                          components={comps}
                          setComp={setComp}
                      />
                    );
                case 'calendar':
                    return  (
                      <CalendarBody
                          comp={comp}
                          components={comps}
                          setComp={setComp}
                      />
                    );
                case 'carousal':
                    return <Box />;
                default:
                    return null;
            }
        })
  }
    </>
  );
}

export default EditComponent;