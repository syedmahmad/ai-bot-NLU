import React, { useState, useEffect } from "react";
import {
  Text,
  Input,
  Button,
  Box,
  Image,
  Checkbox,
  Accordion,
  Select,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from '@chakra-ui/react';
import { mongoObjectId } from '../../utils/index'
import { Icon } from '@iconify/react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';
import {stateFromHTML} from 'draft-js-import-html';

const initialCardState = () => {
  return {
  id: mongoObjectId(),
  label: 'new card',
  file: null,
  text: "<p></p>",
  buttonProps: {
    label: "new button",
    variant: "solid",
    show: false
  } 
}
};

function CarousalBody({ comp, components, setComp }) {
  const [selectedCard, setSelectedCard] = useState(comp?.props?.cards[0] || selectedCard);
  const [cards, setCards] = useState(comp?.props?.cards);

  useEffect(() => {
    const arr = components?.map((mainItem) => {
      if (mainItem.order === comp.order) {
        mainItem.props = {
          ...mainItem.props,
          cards: cards,
        }
      }
      return mainItem;
    });
    setComp(arr);
  }, [cards]);

  useEffect(() => {
    const arr = cards?.map((card) => {
      if(card.id === selectedCard.id) {
        return {...selectedCard, label: selectedCard.label, file: selectedCard.file}
      }
      return card;
    })
    setCards(arr);
  }, [selectedCard]);

  const deleteNode = (id) => {
    if (cards.length === 1) {
      if (components.length === 1) {
        alert("Node should contain atleast 1 widget!");
        return;
      } else {
        const newData = components.filter((data) => data.order !== comp.order);
        setComp(newData);
      }
    } else {
      const newCards = cards.filter((data) => data.id !== id)
      setCards(newCards);
    }
  };

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

          <Accordion
              allowToggle
              defaultIndex={[0]}
          >
            {
              cards?.map((card) => {
                return(
                  <AccordionChildItems 
                      card={card}
                      cards={cards}
                      deleteNode={deleteNode}
                      selectedCard={selectedCard}
                      setCards={setCards}
                      setSelectedCard={setSelectedCard}
                  />
                )
              })
            }
          </Accordion>
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
            onClick={() => setCards([...cards, initialCardState()])}
            width="7.375rem"
        >
          Add Card
        </Button>
      </Box>
    </Box>
  )
}

export default CarousalBody;


function AccordionChildItems({cards, setCards, card, setSelectedCard, selectedCard, deleteNode, }) {
  const [convertedContent, setConvertedContent] = useState(card.text);
  let contentState = stateFromHTML(convertedContent);
  const [editorState, setEditorState] = useState(() => EditorState.createWithContent(contentState));

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    const convertedFile = base64?.replace(/^data:image\/[a-z]+;base64,/, "");
    setSelectedCard({...selectedCard, file: convertedFile})
  };

  useEffect(() => {
    let html = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(html);
  }, [editorState]);

  useEffect(() => {
    const arr = cards.map((item) => {
      if (item.id === selectedCard.id) {
        return {...selectedCard, text: convertedContent}
      }
      return item;
    })
    setCards(arr);
  }, [convertedContent]);


  return (
    <AccordionItem
        border="none"
        margin="10px"
        onClick={() => setSelectedCard(card)}
        paddingLeft={0}
        width="100%"
    >
      <Box
          alignItems="center"
          display="flex"
          justifyContent="space-between"
      >
        <AccordionButton
            _hover={{ background: 'transparent'}}
            justifyContent="space-between"
            padding="0"
            width="100%"
        >
          <Box
              background="#F9FAFC"
              border="none"
              borderRadius="6px"
              display="flex"
              height="35px"
              justifyContent="space-between"
              padding="5px 20px"
              textAlign="left"
              width="100%"
          >
            <Box color="#858585">
              {card.label}
            </Box>

            <Icon
                color='hsla(0, 0%, 85%, 1)'
                fontSize="16px"
                icon="gridicons:dropdown"
                style={{ marginTop: '7px'}}
            />
          </Box>
        </AccordionButton>

        <Box
            cursor="pointer"
            display="flex"
            justifyContent="flex-end"
            onClick={() =>  deleteNode(card.id)}
            width="10%"
        >
          <Icon
              color='hsla(0, 0%, 85%, 1)'
              icon="ic:outline-delete"
          />
        </Box>
      </Box>

      <AccordionPanel
          pb={4}
          px={0}
          width="91%"
      >
        <Box>
          {card.file !== null && card.file !== '' ? (
            <Image 
                alt="Preview"
                borderRadius="0.3125rem"
                height="300px"
                objectFit="contain"
                src={`data:image/png;base64,${card.file}`}
                width="100%"
            />
                      ) : null}

          {card.file !== null && card.file !== '' ? null : (
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
                      _hover={{ backgroundColor: 'primary.90', color: "white" }}
                      borderColor="primary.100"
                      borderRadius="0.25rem"
                      color="primary.100"
                      height="1.75rem"
                      onClick={() => document.getElementById("file-carousal").click()}
                      width="7.375rem"
                  >
                    Upload
                  </Button>

                  <Input
                      id="file-carousal"
                      onChange={(e) => handleFileUpload(e)}
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
            Title
          </Text>

          <Input
              borderRadius="0.3125rem"
              onChange={(e) => {setSelectedCard({...selectedCard, label: e.target.value})}}
              placeholder="Add title for this card here here"
              size="sm"
              value={selectedCard.label}
          />


          <Text
              color="text.body"
              fontSize="xs"
              margin="10px 0px 0px"
          >
            Description
          </Text>

          <Editor
              editorClassName="editor-class"
              editorState={editorState}
              onEditorStateChange={setEditorState}
              placeholder="Add something here"
              toolbar={{
                          image: {
                            alt: { present: true, mandatory: false },
                            previewImage: true,
                            inputAccept: 'svg',
                          },
                          options: ['inline', 'link'],
                          inline: {
                            inDropdown: false,
                            options: ['bold', 'italic', 'underline', 'strikethrough'],
                          },
                          link: {
                            inDropdown: false,
                            options: ['link'],
                          },
                        }}
              toolbarClassName="toolbar-class"
              toolbarCustomButtons={[
                <div style={{
                          display: 'flex',
                          alignItems: 'center'
                        }}
                >
                  <div
                      className="insert-entity"
                      onClick={() => alert('Coming Soon!')}
                  >
                    Insert Entity
                  </div>
                </div>,
                        ]}
              wrapperClassName="wrapper-class"
          />

          <br />

          <Box>
            <Checkbox
                color="text.body"
                iconColor='blue.400'
                iconSize='1rem'
                isChecked={selectedCard.buttonProps.show}
                onChange={() => setSelectedCard({...selectedCard, buttonProps: {
                  ...selectedCard.buttonProps, show: !selectedCard.buttonProps.show
                }})}
            >
              Add Buttons
            </Checkbox>
          </Box>

          <br />

          <Box
              width="100%"
          >
            <Text
                color="text.body"
                fontSize="xs"
                marginBottom="5px"
            >
              Button Label
            </Text>

            <Input
                borderRadius="0.3125rem"
                marginBottom="10px"
                onChange={(e) => setSelectedCard({...selectedCard, buttonProps: {
                  ...selectedCard.buttonProps,
                  label: e.target.value
                }})}
                placeholder="Type here"
                size="sm"
                value={selectedCard.buttonProps.label}
            />

            <Text
                color="text.body"
                fontSize="xs"
                marginBottom="5px"
            >
              Button Type
            </Text>

            <Select
                marginBottom="10px"
                onChange={(e) => setSelectedCard({...selectedCard, buttonProps: {
                  ...selectedCard.buttonProps,
                  variant: e.target.value
                }})}
                placeholder='Button Type'
                size="md"
                value={selectedCard.buttonProps.variant}
            >
              <option
                  selected
                  value='outline'
              >
                Outlined Button
              </option>

              <option value='ghost'>
                Text Button
              </option>

              <option
                  selected
                  value='solid'
              >
                Filled Button
              </option>

              <option value='link'>
                FAB Button
              </option>

            </Select>
          </Box>
        </Box>

      </AccordionPanel>
    </AccordionItem>
  );
}
