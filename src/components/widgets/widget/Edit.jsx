import React from 'react';
import TextBody from '../../popoverBodies/Text';
import ButtonBody from '../../popoverBodies/Button';
import ImageBody from '../../popoverBodies/Image';
import CalendarBody from '../../popoverBodies/Calender';
// import CarousalBody from '../../popoverBodies/Carousal';

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
                    return (
                      <div />
                      // <CarousalBody
                      //     comp={comp}
                      //     components={comps}
                      //     setComp={setComp}
                      // />
                    );
                default:
                    return null;
            }
        })
  }
    </>
  );
}

export default EditComponent;