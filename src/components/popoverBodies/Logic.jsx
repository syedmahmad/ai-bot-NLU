import React from "react";
import {
  Box
} from '@chakra-ui/react';
import { Icon } from '@iconify/react';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

function LogicBody({comp, components, setComp}) {
//   useEffect(() => {
//     const arr = components?.map((item) => {
//       if (item.order === comp.order) {
//         item.props = {
//           ...item.props,
//           value: convertedContent
//         }
//       }
//       return item
//     });
//     setComp(arr);
//   }, [convertedContent]);

  const deleteNode = () => {
    if (components.length === 1) {
      alert("Node should contain atleast 1 widget!");
      return;
    }
    const newData = components.filter((data) => data.order !== comp.order);
    setComp(newData);
  }
  
  return(
    <>
      <Box
          display="flex"
          justifyContent="space-between"
      >
        <Box
            width="93%"
        />

        <Box
            cursor="pointer"
            onClick={() => deleteNode()}
        >
          <Icon
              color='hsla(0, 0%, 85%, 1)'
              icon="ic:outline-delete"
          />
        </Box>
      </Box>

      <Box
          display="flex"
          justifyContent="right"
          marginTop="10px"
          width="93%"
      >
        <Box
            _hover={{ backgroundColor: 'primary.90' }}
            backgroundColor="primary.100"
            color="white"
            onClick={() => alert('Coming Soon!')}
            size="sm"
            width="118px"
        >
          Add a condition
        </Box>
      </Box>
    </>
  )
}

export default LogicBody;