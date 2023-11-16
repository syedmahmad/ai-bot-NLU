import { Avatar, AvatarBadge } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import { XivaLogo } from '../../assets/XivaLogo';

function Header() {
  return (
    <Box
        alignItems="center"
        backgroundColor="secondary.100"
        display="flex"
        height="3.1875rem"
        justifyContent="space-between"
        w="100%"
    >
      <Box padding="12px 32px">
        <XivaLogo />
      </Box>

      <Box padding="12px 32px">
        <Avatar
            backgroundColor="transparent"
            border="1px solid"
            borderColor="white"
            boxSize="10"
            color="white"
            name="Abrahmov"
        >
          <AvatarBadge
              bg="green.500"
              border={0}
              boxSize="0.635rem"
          />
        </Avatar>
      </Box>
    </Box>
  );
}

export default Header;
