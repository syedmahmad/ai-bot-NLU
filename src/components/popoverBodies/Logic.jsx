/* eslint-disable */
import React from "react";
import {
  Box, Input, Text, Select, Textarea,
  InputRightElement, InputGroup, Divider 
} from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

function LogicBody({comp, components, setComp}) {

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
          justifyContent="right"
          marginTop="10px"
          width="100%"
      >
        <Box
          width="100%"
        > 
          <Box
            display="flex"
            justifyContent="space-between"
            marginBottom="15px"
           >
            <Text marginLeft="5px">
              Condition 1
            </Text>
            <Icon
              color='hsla(0, 0%, 85%, 1)'
              icon="ri:arrow-drop-down-line"
              fontSize={30}
          />
        </Box>

          <Box>
            <Text 
              color="text.body"
              fontSize="xs"
              fontWeight={400}
              margin="5px 0px"
              marginLeft="5px"
            >
             Condition Label
            </Text>
          </Box>
          <Input
              width='93%'
              size='lg'
              height="32px"
          /> 


          <Box
            display="flex"
            justifyContent="space-between"
            marginTop="20px"
          >
            <Text
             color="text.body"
             fontSize="sm"
             fontWeight={400}
             margin="5px 0px"
            >
              IF
            </Text> 
            <InputGroup width="79px">
              <Input padding="0px 10px" borderRadius="3px" height="28px" placeholder="user_Id" size="xs" />
              <InputRightElement marginTop="-5px">
                <Icon
                  icon="fxemoji:cancellationx"
                  fontSize={10}
                  fontWeight={600}
                />
              </InputRightElement>
            </InputGroup>
            <Select width="109px" height="28px" size="xs" placeholder="is greater than" borderRadius="3px">
                <option value='option1'>Option 1</option>
                <option value='option2'>Option 2</option>
                <option value='option3'>Option 3</option>
            </Select> 
            <InputGroup width="79px">
              <Input padding="0px 10px" borderRadius="3px" height="28px" placeholder="value" size="xs" />
              <InputRightElement marginTop="-5px">
                <Icon
                  icon="fxemoji:cancellationx"
                  fontSize={10}
                  fontWeight={600}
                />
              </InputRightElement>
            </InputGroup>
          </Box>
          <Box
            display="flex"
            marginTop="20px"
            width="54%"
            justifyContent="space-between"
          >
              <Select width="73px" placeholder="AND" size="xs" height="28px" borderRadius="3px">
                <option value='option1'>Option 1</option>
                <option value='option2'>Option 2</option>
                <option value='option3'>Option 3</option>
              </Select> 
            <InputGroup width="79px">
              <Input padding="0px 10px" height="28px" placeholder="value" size="xs" borderRadius="3px" />
              <InputRightElement marginTop="-5px">
                <Icon
                  icon="fxemoji:cancellationx"
                  fontSize={10}
                  fontWeight={600}
                />
              </InputRightElement>
            </InputGroup>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Box 
              marginTop="20px"
              border="1px dotted #D8D8D8"
              padding="20px"
              width="93%"
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
              fontWeight={600}
              >Add a condition</Text>
            </Box>
            </Box>
            <Box marginTop="20px">
              <Icon
                color='hsla(0, 0%, 85%, 1)'
                icon="ic:outline-delete"
              />
            </Box>
          </Box>
          <Box>
          <Box display="flex" justifyContent="space-between">
            <Box
              display="flex"
              marginTop="20px"
              width="70%"
              justifyContent="space-between"
            >
                <Select width="73px" height="28px" placeholder="AND" borderRadius="3px">
                  <option value='option1'>Option 1</option>
                  <option value='option2'>Option 2</option>
                  <option value='option3'>Option 3</option>
                </Select> 
                <InputGroup width="124px">
                  <Input padding="0px 10px" height="28px" placeholder="Name is not soma" size="xs" borderRadius="3px" />
                  <InputRightElement marginTop="-5px">
                    <Icon
                      icon="fxemoji:cancellationx"
                      fontSize={10}
                      fontWeight={600}
                    />
                  </InputRightElement>
                </InputGroup>
            </Box>
            <Box marginTop="20px">
              <Icon
                color='hsla(0, 0%, 85%, 1)'
                icon="ic:outline-delete"
              />
            </Box>
          </Box>
          <Box
            marginTop="10px" 
            >
            <Text
             color="primary.100"
             fontSize="sm"
             fontWeight={600}
            >Add a condition</Text>
          </Box>
          </Box>

          <Divider marginTop="20px"  />

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

        <Divider marginTop="20px"  />
          
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