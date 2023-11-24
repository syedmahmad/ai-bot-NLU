/* eslint-disable */
import React from 'react';
import TextBody from '../../popoverBodies/Text';
import ButtonBody from '../../popoverBodies/Button';
import ImageBody from '../../popoverBodies/Image';
import CalendarBody from '../../popoverBodies/Calender';

function EditComponent({ comps, setComp }) {
  return (
    <>{ 
        comps.sort(order).map((comp) => {
            switch(comp.name) {
                case 'text':
                    return (<TextBody comp={comp} setComp={setComp} components={comps} />);
                case 'button':
                    return (<ButtonBody comp={comp} setComp={setComp} components={comps} />);
                case 'image':
                    return (<ImageBody comp={comp} setComp={setComp} components={comps} />);
                case 'calendar':
                    return  <CalendarBody comp={comp} setComp={setComp} components={comps} />;
                case 'carousal':
                    return <></>;
                default:
                    return null;
            }
        })
  }</>
  );
}

export default EditComponent;