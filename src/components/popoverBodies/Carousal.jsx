import React, { useState, useEffect } from "react";
import {
  Text,
  Input,
  Button,
  Box,
  Image,
  Select
} from '@chakra-ui/react';
// import uniqid from 'uniqid';
import { mongoObjectId } from '../../utils/index'
import { Icon } from '@iconify/react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';
import {stateFromHTML} from 'draft-js-import-html';

const initialCardState = {
  id: mongoObjectId(),
  label: '',
  file: null,
  text: ""
};

function CarousalBody({ comp, components, setComp }) {
  const [selectedCard, setSelectedCard] = useState(initialCardState);
  const [convertedContent, setConvertedContent] = useState(initialCardState.text);
  let contentState = stateFromHTML(convertedContent);
  const [editorState, setEditorState] = useState(() => EditorState.createWithContent(contentState));

  useEffect(() => {
    let html = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(html);
  }, [editorState]);

  useEffect(() => {
    const arr = components?.map((item) => {
      if (item.order === comp.order) {
        item.props = {
          ...item.props,
          cards: comp?.props?.cards?.map((item) => {
            if (item.id === selectedCard.id) {
              return {...selectedCard, text: convertedContent}
            }
            return item
          })
        }
      }
      return item
    });
    setComp(arr);
  }, [selectedCard, convertedContent]);

  const deleteNode = () => {
    if (components.length === 1) {
      alert("Node should contain atleast 1 widget!");
      return;
    }
    const newData = components.filter((data) => data.order !== comp.order);
    setComp(newData);
  }

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

          {selectedCard.text !== "" ? 
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
            </Box> : null}
        </Box>

        <Box
            cursor="pointer"
            marginTop="25px"
            onClick={() => deleteNode()}
        >
          <Icon
              color='hsla(0, 0%, 85%, 1)'
              icon="ic:outline-delete"
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