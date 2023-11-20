import React, { useState, useEffect } from 'react';
import { Handle, Position } from 'reactflow';
import { Icon } from '@iconify/react';
import {
  Box,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Checkbox,
  Button
} from '@chakra-ui/react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useWidgets } from '../../context/WidgetsContext';

function TextComponent({ data, isConnectable }) {
  const { widget } = useWidgets();
  console.log("widget", widget);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  );
  const [convertedContent, setConvertedContent] = useState('');

  useEffect(() => {
    let html = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(html);
  }, [editorState]);

  const handleClick = (event) => {
    // saving node id to use it later when user try to create new ndoe
    event.target.setAttribute('data-id', data.sourceHandle);
    data.onNodeClick(event);
  };

  return (
    <>
      {/* handle={type="target"} means
          (isConnectableEnd?) Dictates whether a connection can end on this handle.
      */}
      <Handle
          isConnectable={isConnectable}
          onConnect={(params) => console.log('handle onConnect', params)}
          position={Position.Top}
          style={{ top: 'auto', visibility: 'hidden' }}
          type="target"
      />

      <Popover
          isLazy
          placement="left-start"
      >
        <PopoverTrigger>
          <Box
              onClick={handleClick}
              style={{
              background: 'transparent',
              height: 'fit-content',
              width: '300px',
              marginTop: '10px' 
            }}
          >
            <Box
                background={data.nodeType === 'customer' ? "#FCD8E0" : "#D1EAFE"}
                borderRadius="17.487px 17.487px 0px 17.487px"
                padding={4}
                width="100%"
            >
              <Box
                  alignItems="center"
                  background="#fff"
                  borderRadius="17.487px 17.487px 0px 17.487px"
                  color="text.body"
                  dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(convertedContent),
                }}
                  display="flex"
                  fontSize="md"
                  justifyContent="center"
                  margin="6px 0px"
                  minHeight="68px"
                  textTransform="capitalize"
                  width="100%"
              />
            </Box>

            {/* <img src="https://via.placeholder.com/300.png/09f/fff" alt="Girl in a jacket" width="100" height="100" /> */}
          </Box>
        </PopoverTrigger>

        <PopoverContent>
          <PopoverArrow />

          {/* <PopoverCloseButton /> */}
          <PopoverHeader
              display="flex"
              justifyContent="space-between"
              padding="15px 10px 0px"
          >
            <Box>
              Text
            </Box>

            <Box>
              <Icon
                  color='hsla(0, 0%, 85%, 1)'
                  icon="bi:three-dots-vertical"
              />
            </Box>
          </PopoverHeader>

          <PopoverBody paddingBottom="30px">
            <Box
                display="flex"
                justifyContent="space-between"
            >
              <Box
                  width="93%"
              >
                <Editor
                    editorClassName="editor-class"
                    editorRef={(ref) => {
                  ref?.focus();
                }}
                    editorState={editorState}
                    onEditorStateChange={setEditorState}
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
                    bold: {
                      icon: '/icons/bold',
                    },
                  },
                  link: {
                    inDropdown: false,
                    options: ['link'],
                  },
                }}
                    toolbarClassName="toolbar-class"
                    toolbarCustomButtons={[
                      <div
                          className="insert-entity"
                          onClick={() => alert('Coming Soon!')}
                      >
                        Insert Entity
                      </div>,
                ]}
                    wrapperClassName="wrapper-class"
                />
              </Box>

              <Box>
                <Icon
                    color='hsla(0, 0%, 85%, 1)'
                    icon="ic:outline-delete"
                />
              </Box>
            </Box>

            <Box marginTop="10px">
              <Checkbox
                  color="text.body"
                  iconColor='blue.400'
                  iconSize='1rem'
              >
                Question
              </Checkbox>
            </Box>

            <Box
                display="flex"
                justifyContent="right"
                width="92%"
            >
              <Button
                  _hover={{ backgroundColor: 'primary.90' }}
                  backgroundColor="primary.100"
                  color="white"
                  size="sm"
                  width="118px"
              >
                Add Variant
              </Button>
            </Box>
          </PopoverBody>
        </PopoverContent>
      </Popover>

      {/* handle={type="source"} means
          (isConnectableStart?) Dictates whether a connection can start from this handle.
      */}
      <Handle
          id={data.sourceHandle}
          isConnectable={isConnectable}
          onConnect={(params) => console.log('handle onConnect', params)}
          position={Position.Bottom}
          style={{ background: '#fff', border: '1px solid', borderColor: 'hsla(0, 0%, 93%, 1)', top: "auto", marginBottom: '10px' }}
          type="source"
      />
    </>
  );
}

export default TextComponent;
