import React from "react";
import { Button } from '@chakra-ui/react';

function CreateFlowButton({ createFlowOnOpen }) {
  return(
    <Button
        _hover={{ backgroundColor: 'primary.90' }}
        backgroundColor="primary.100"
        borderRadius="0.25rem"
        color="white"
        height="1.75rem"
        onClick={createFlowOnOpen}
        width="7.375rem"
    >
      Create Flow
    </Button>
  )
}

export default CreateFlowButton