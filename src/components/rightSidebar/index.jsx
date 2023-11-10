import { Box, Text, Select, Input } from '@chakra-ui/react';
import { Icon } from '@iconify/react';

const RightSidebar = () => {
  return (
    <Box height={'calc(100vh - 71px)'} width={'100%'}>
      <Box
        height={'2.625rem'}
        width={'100%'}
        backgroundColor={'secondary.10'}
        border={'1px sollid'}
        borderColor={'stroke.table'}
        padding={'0px 12px'}
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Box width={'100px'}>
          <Text
            color={'text.menu'}
            fontSize={'sm'}
            fontWeight={300}
            fontFamily={'Inter'}
          >
            Flow Diagram
          </Text>
        </Box>
        <Box
          cursor={'pointer'}
          width={'1.375rem'}
          height={'1.375rem'}
          backgroundColor={'white'}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          borderRadius={'3px'}
        >
          <Icon icon="lucide:expand" color="hsla(0, 0%, 52%, 1)" />
        </Box>
      </Box>
      <Box
        height={'17.1875rem'}
        width={'100%'}
        backgroundColor={'white'}
        border={'1px solid'}
        borderColor={'stroke.menuOrCard'}
      >
        {/* <MiniMap position="top-right"/> */}
      </Box>
      <Box
        height={'2.625rem'}
        width={'100%'}
        backgroundColor={'secondary.10'}
        border={'1px sollid'}
        borderColor={'stroke.table'}
        padding={'0px 12px'}
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Box width={'100px'}>
          <Text
            color={'text.menu'}
            fontSize={'sm'}
            fontWeight={300}
            fontFamily={'Inter'}
          >
            Test
          </Text>
        </Box>
        <Box display={'flex'} alignItems={'center'}>
          <Box marginRight={'10px'} height={'1.375rem'} width={'10.75rem'}>
            <Select
              marginTop={'-3px'}
              placeholder="Select Channel"
              color={'text.menu'}
              height={'1.75rem'}
              backgroundColor={'white'}
              width={'10.75rem'}
            >
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
          </Box>
          <Box
            cursor={'pointer'}
            width={'1.375rem'}
            height={'1.375rem'}
            backgroundColor={'white'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            borderRadius={'3px'}
          >
            <Icon icon="tabler:reload" color="hsla(0, 0%, 52%, 1)" />
          </Box>
        </Box>
      </Box>
      <Box
        height={'17.1875rem'}
        width={'100%'}
        backgroundColor={'white'}
        border={'1px solid'}
        borderColor={'stroke.menuOrCard'}
      >
        {/* <MiniMap position="top-right"/> */}
        <Box
          position={'fixed'}
          bottom={2}
          paddingLeft={'14px'}
          width={'26.75rem'}
          display={'flex'}
          alignItems={'center'}
        >
          <Box width={'21.5625rem'} marginRight={'10px'}>
            <Input placeholder="Type here" size="lg" />
          </Box>
          <Box width={'20px'} marginLeft={'10px'} cursor={'pointer'}>
            <Icon
              icon="fluent:send-32-regular"
              color="hsla(349, 100%, 67%, 1)"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default RightSidebar;
