import React, { useState, useEffect } from "react";
import {
  Box,
  Checkbox,
  Button,
  Text,
  Input,
  Divider
} from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';
import {stateFromHTML} from 'draft-js-import-html';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

// eslint-disable-next-line react/display-name
const TextBody = React.forwardRef((props, ref) => {
  const {comp, components, setComp, type} = props;
  const [convertedContent, setConvertedContent] = useState(comp.props.value === 'Add something here' ? '' : comp.props.value);
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
          value: convertedContent
        }
      }
      return item
    });
    setComp(arr);
  }, [convertedContent]);

  const deleteNode = () => {
    if (components.length === 1) {
      alert("Node should contain atleast 1 widget!");
      return;
    }
    const newData = components.filter((data) => data.order !== comp.order);
    setComp(newData);
  }
  
  useEffect(() => {
    if (ref) {
      ref.current.focusEditor();
    }
  }, [ref]);

  return(
    <>
      <Box
          display="flex"
          justifyContent="space-between"
      >
        <Box
            width="93%"
        >
          <Editor
              editorClassName="editor-class"
              editorState={editorState}
              onEditorStateChange={setEditorState}
              placeholder="Add text here"
              ref={ref}
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
        </Box>

        <Box
            cursor="pointer"
            onClick={() => deleteNode()}
        >
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
            onChange={() => alert('Coming Soon!')}
        >
          Question
        </Checkbox>
      </Box>

      {type === "customer_response_node" ? <>
        <Box
            marginTop="10px"
            width="93%"
        >
          <Text
              color="text.body"
              fontSize="xs"
          >
            Triggered Intent
          </Text>

          <Input
              borderRadius="0.3125rem"
              placeholder="Intent Name"
              size="sm"
          />
        </Box>

        <Box
            marginTop="10px"
            width="93%"
        >
          <Text
              color="text.body"
              fontSize="xs"
          >
            Add Entity
          </Text>

          <Input
              borderRadius="0.3125rem"
              placeholder="Entity name"
              size="sm"
          />
        </Box>
      </> : null}

      <Divider
          borderColor="#D8D8D8"
          marginTop="10px"
          width="93%"
      />                

      <Box
          display="flex"
          justifyContent="right"
          marginTop="10px"
          width="93%"
      >
        <Button
            _hover={{ backgroundColor: 'primary.90' }}
            backgroundColor="primary.100"
            color="white"
            onClick={() => alert('Coming Soon!')}
            size="sm"
            width="118px"
        >
          Add Variant
        </Button>
      </Box>
    </>
  )
});

export default TextBody;