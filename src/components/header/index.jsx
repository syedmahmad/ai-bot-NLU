import { Avatar, AvatarBadge } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import { XivaLogo } from '../../assets/XivaLogo';

const Header = () => {
  return (
    <Box
      w="100%"
      backgroundColor="secondary.100"
      height="3.1875rem"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box padding="12px 32px">
        <XivaLogo />
      </Box>
      <Box padding="12px 32px">
        <Avatar
          name="Abrahmov"
          backgroundColor="transparent"
          color="white"
          borderColor="white"
          border="1px solid"
          boxSize="10"
        >
          <AvatarBadge boxSize="0.635rem" bg="green.500" border={0} />
        </Avatar>
      </Box>
    </Box>
  );
};

export default Header;
