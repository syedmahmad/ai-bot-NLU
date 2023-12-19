import React, { useState, useEffect } from "react";
import {
  Box,
  Checkbox,
  Button
} from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';
import {stateFromHTML} from 'draft-js-import-html';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

function TextBody({comp, components, setComp}) {
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
        </Box>

        <Box
            onClick={() => alert('Coming Soon!')}
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

      <Box
          display="flex"
          justifyContent="right"
          width="92%"
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
}

export default TextBody;