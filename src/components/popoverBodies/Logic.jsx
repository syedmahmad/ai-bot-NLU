import React from "react";
import {
  Box, Input, Text, Select, Textarea,
  InputRightElement, InputGroup, Divider 
} from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

function LogicBody({comp, components, setComp}) {

  // const deleteNode = () => {
  //   if (components.length === 1) {
  //     alert("Node should contain atleast 1 widget!");
  //     return;
  //   }
  //   const newData = components.filter((data) => data.order !== comp.order);
  //   setComp(newData);
  // }
  console.log(comp, components, setComp);
  
  return(
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
              fontSize={30}
              icon="ri:arrow-drop-down-line"
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
            height="32px"
            size='lg'
            width='93%'
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
            <Input
                borderRadius="3px"
                height="28px"
                padding="0px 10px"
                placeholder="user_Id"
                size="xs"
            />

            <InputRightElement marginTop="-5px">
              <Icon
                  fontSize={10}
                  fontWeight={600}
                  icon="fxemoji:cancellationx"
              />
            </InputRightElement>
          </InputGroup>

          <Select
              borderRadius="3px"
              height="28px"
              placeholder="is greater than"
              size="xs"
              width="109px"
          >
            <option value='option1'>
              Option 1
            </option>

            <option value='option2'>
              Option 2
            </option>

            <option value='option3'>
              Option 3
            </option>
          </Select> 

          <InputGroup width="79px">
            <Input
                borderRadius="3px"
                height="28px"
                padding="0px 10px"
                placeholder="value"
                size="xs"
            />

            <InputRightElement marginTop="-5px">
              <Icon
                  fontSize={10}
                  fontWeight={600}
                  icon="fxemoji:cancellationx"
              />
            </InputRightElement>
          </InputGroup>
        </Box>

        <Box
            display="flex"
            justifyContent="space-between"
            marginTop="20px"
            width="54%"
        >
          <Select
              borderRadius="3px"
              height="28px"
              placeholder="AND"
              size="xs"
              width="73px"
          >
            <option value='option1'>
              Option 1
            </option>

            <option value='option2'>
              Option 2
            </option>

            <option value='option3'>
              Option 3
            </option>
          </Select> 

          <InputGroup width="79px">
            <Input
                borderRadius="3px"
                height="28px"
                padding="0px 10px"
                placeholder="value"
                size="xs"
            />

            <InputRightElement marginTop="-5px">
              <Icon
                  fontSize={10}
                  fontWeight={600}
                  icon="fxemoji:cancellationx"
              />
            </InputRightElement>
          </InputGroup>
        </Box>

        <Box
            display="flex"
            justifyContent="space-between"
        >
          <Box 
              border="1px dotted #D8D8D8"
              marginTop="20px"
              padding="20px"
              width="93%"
          >
            <Box
                display="flex"
                justifyContent="space-between"
            >
              <Text 
                  color="text.body"
                  fontSize="medium"
                  fontWeight={400}
              >
                IF
              </Text>

              <Input
                  placeholder="is greater than 45"
                  size="md"
                  width="auto"
              />
            </Box>

            <Box
                display="flex"
                justifyContent="space-between"
                marginTop="20px"
            >
              <Text
                  color="text.body"
                  fontSize="medium"
                  fontWeight={400}
              >
                OR
              </Text>

              <Input
                  placeholder="is greater than 45"
                  size="md"
                  width="auto"
              />
            </Box>

            <Box
                marginTop="10px"
            >
              <Text
                  color="primary.100"
                  fontSize="sm"
                  fontWeight={600}
              >
                Add a condition
              </Text>
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
          <Box
              display="flex"
              justifyContent="space-between"
          >
            <Box
                display="flex"
                justifyContent="space-between"
                marginTop="20px"
                width="70%"
            >
              <Select
                  borderRadius="3px"
                  height="28px"
                  placeholder="AND"
                  width="73px"
              >
                <option value='option1'>
                  Option 1
                </option>

                <option value='option2'>
                  Option 2
                </option>

                <option value='option3'>
                  Option 3
                </option>
              </Select> 

              <InputGroup width="124px">
                <Input
                    borderRadius="3px"
                    height="28px"
                    padding="0px 10px"
                    placeholder="Name is not soma"
                    size="xs"
                />

                <InputRightElement marginTop="-5px">
                  <Icon
                      fontSize={10}
                      fontWeight={600}
                      icon="fxemoji:cancellationx"
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
            >
              Add a condition
            </Text>
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
            <Textarea
                placeholder='Condition Successful'
                resize={false}
            />
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
            <Textarea
                placeholder='Condition Failed'
                resize={false}
            />
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
  )
}

export default LogicBody;