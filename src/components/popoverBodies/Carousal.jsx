import React, { useState, useEffect } from "react";
import {
  Text,
  Input,
  Button,
  Box,
  Image,
  Select
} from '@chakra-ui/react';
import uniqid from 'uniqid';
import { Icon } from '@iconify/react';

const initialCardState = {
  id: uniqid(),
  label: '',
  file: null,
  text: ""
};

function CarousalBody({ comp, components, setComp }) {
  const [selectedCard, setSelectedCard] = useState(initialCardState);

  useEffect(() => {
    const arr = components?.map((item) => {
      if (item.order === comp.order) {
        item.props = {
          ...item.props,
          cards: comp?.props?.cards?.map((item) => {
            if (item.id === selectedCard.id) {
              return selectedCard
            }
            return item
          })
        }
      }
      return item
    });
    setComp(arr);
  }, [selectedCard]);

  const handleChange = (e) => {
    const cardId = e.target.value;
    const card = comp?.props?.cards?.find(u => u.id === cardId);
    setSelectedCard(card);
  }
  return(
    <Box
        width="100%"
    >
      <Box
          display="flex"
          justifyContent="space-between"
      >
        <Box
            width="93%"
        >
          <Text
              color="text.body"
              fontSize="xs"
              marginBottom="5px"
          >
            Select Card To Edit
          </Text>

          <Select
              marginBottom="10px"
              onChange={(e) => handleChange(e)}
              placeholder='Select Card'
              size="md"
              value={selectedCard.id}
          >
            {
          comp?.props?.cards?.map((card) => {
            return(
              <option
                  key={card.id}
                  value={card.id}
              >
                {card?.label}
              </option>
            )
          })
        }

          </Select>

          {selectedCard.text !== '' ? 
            <Box>
              {selectedCard.file !== null && selectedCard.file !== '' ? (
                <Image 
                    alt="Preview"
                    borderRadius="0.3125rem"
                    height="300px"
                    objectFit="contain"
                    src={selectedCard.file}
                    width="100%"
                />
        ) : null}

              {selectedCard.file !== null && selectedCard.file !== '' ? null : (
                <Box width="100%">
                  <Text
                      color="text.body"
                      fontSize="xs"
                  >
                    Upload Image
                  </Text>

                  <Box
                      display="flex"
                      justifyContent="space-between"
                      marginBottom="10px"
                      width="100%"
                  >
                    <Box
                        alignItems="center"
                        backgroundColor="background.flowDiagram"
                        border="0.5px solid"
                        borderColor="stroke.table"
                        borderRadius="0.3125rem"
                        display="flex"
                        height="8.0625rem"
                        justifyContent="center"
                        paddingTop="20%"
                        width="100%"
                    >
                      <Button
                          _hover={{ backgroundColor: 'primary.90' }}
                          backgroundColor="primary.100"
                          borderRadius="0.25rem"
                          color="white"
                          height="1.75rem"
                          onClick={() => document.getElementById("file-carousal").click()}
                          width="7.375rem"
                      >
                        Upload
                      </Button>

                      <Input
                          id="file-carousal"
                          onChange={(e) =>
                    setSelectedCard({...selectedCard, file: URL.createObjectURL(e.target.files[0])})}
                          style={{display: "none"}}
                          type="file"
                      />
                    </Box>
                  </Box>
                </Box>
            )}

              <Text
                  color="text.body"
                  fontSize="xs"
              >
                Add Link
              </Text>

              <Input
                  borderRadius="0.3125rem"
                  onChange={(e) => setSelectedCard({...selectedCard, file: e.target.value})}
                  placeholder="Add url here"
                  size="sm"
              />

              <Text
                  color="text.body"
                  fontSize="xs"
                  margin="10px 0px 0px"
              >
                Add Text
              </Text>

              <Input
                  borderRadius="0.3125rem"
                  onChange={(e) => setSelectedCard({...selectedCard, text: e.target.value})}
                  placeholder="Add text here"
                  size="sm"
                  value={selectedCard.text}
              />
            </Box> : null}
        </Box>

        <Box
            marginTop="25px"
        >
          <Icon
              color='hsla(0, 0%, 85%, 1)'
              icon="ic:outline-delete"
              onClick={() => alert('Coming Soon!')}
          />
        </Box>
      </Box>

      <br />

      <Box 
          display="flex"
          justifyContent="right"
      >
        <Button
            _hover={{ backgroundColor: 'primary.90' }}
            backgroundColor="primary.100"
            borderRadius="0.25rem"
            color="white"
            onClick={() => alert('Coming Soon!')}
            width="7.375rem"
        >
          Add Card
        </Button>
      </Box>
    </Box>
  )
}

export default CarousalBody;