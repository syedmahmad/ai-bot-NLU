/* eslint-disable */
import React from "react";
import {
  Box, Input, Text, Select, Textarea,
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
          width="100%"
        > 
          <Box
          display="flex"
          justifyContent="space-between"
          marginBottom="15px"
           >
            <Text>
              Condition 1
            </Text>
            <Icon
              color='hsla(0, 0%, 85%, 1)'
              icon="ic:outline-delete"
          />
          </Box>

          <Box>
            <Text 
            color="text.body"
            fontSize="xs"
            fontWeight={400}
            margin="5px 0px"
            >
             Condition Label
            </Text>
          </Box>
          <Input
              width='100%'
              size='lg'
          /> 


          <Box
            display="flex"
            justifyContent="space-between"
            marginTop="20px"
          >
            <Text
             color="text.body"
             fontSize="medium"
             fontWeight={400}
             margin="5px 0px"
            >
              IF
            </Text> 
            <Input width="60px" placeholder="user_Id" size="md" />
            <Select width="109px" placeholder="is greater than">
                <option value='option1'>Option 1</option>
                <option value='option2'>Option 2</option>
                <option value='option3'>Option 3</option>
            </Select> 
              <Input width="60px" placeholder="Value" size="md"/> 
              <Icon
              color='hsla(0, 0%, 85%, 1)'
              icon="ic:outline-delete"
          />
          </Box>
          <Box
            display="flex"
            justifyContent="space-evenly"
            marginTop="20px"
          >
              <Select width="73px" placeholder="AND">
                <option value='option1'>Option 1</option>
                <option value='option2'>Option 2</option>
                <option value='option3'>Option 3</option>
            </Select> 
              <Input width="79px" placeholder="Value"/> 
          </Box>

          <Box 
            marginTop="20px"
            border="1px dotted #D8D8D8"
            padding="20px"
          >
            <Box display="flex" justifyContent="space-between">
            <Text 
            color="text.body"
            fontSize="medium"
            fontWeight={400}>
              IF
            </Text>
            <Input width="auto" placeholder="is greater than 45" size="md" />
            </Box>
            <Box display="flex" justifyContent="space-between" marginTop="20px">
            <Text
            color="text.body"
            fontSize="medium"
            fontWeight={400}
            >
              OR
            </Text>
            <Input width="auto" placeholder="is greater than 45" size="md" />
            </Box>
            <Box
            marginTop="10px" 
            >
            <Text
             color="primary.100"
             fontSize="sm"
             fontWeight={400}
            >Add a condition</Text>
          </Box>
          </Box>

          <Box>
          <Box
            display="flex"
            justifyContent="space-evenly"
            marginTop="20px"
          >
              <Select width="73px" placeholder="AND">
                <option value='option1'>Option 1</option>
                <option value='option2'>Option 2</option>
                <option value='option3'>Option 3</option>
            </Select> 
              <Input width="126px" placeholder="Name is not Soma"/> 
              <Icon
              color='hsla(0, 0%, 85%, 1)'
              icon="ic:outline-delete"
          />
          </Box>
          <Box
            marginTop="10px" 
            >
            <Text
             color="primary.100"
             fontSize="sm"
             fontWeight={400}
            >Add a condition</Text>
          </Box>
          </Box>

        <Box 
        marginTop="20px" 
        >
          <Text>
          Success
          </Text>
          <Box marginTop="10px">
          <Textarea placeholder='Condition Successful' resize={false}/>
          </Box>
        </Box>
          
        <Box 
        marginTop="20px" 
        >
          <Text>
          Fail
          </Text>
          <Box marginTop="10px">
          <Textarea placeholder='Condition Failed' resize={false}/>
          </Box>
        </Box>

        </Box>
        
        {/* <Box
            _hover={{ backgroundColor: 'primary.90' }}
            backgroundColor="primary.100"
            color="white"
            onClick={() => alert('Coming Soon!')}
            size="sm"
            width="118px"
        >
          Add a condition
        </Box> */}
      </Box>
    </>
  )
}

export default LogicBody;