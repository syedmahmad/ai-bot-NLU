import React, { useState } from "react";
import {
  Box,
  Checkbox,
  Button
} from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
// import { convertToHTML } from 'draft-convert';
// import DOMPurify from 'dompurify';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import { useWidgets } from '../../context/WidgetsContext';

function TextBody() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  );
  // const [convertedContent, setConvertedContent] = useState('');
  // console.log(convertedContent);
  // useEffect(() => {
  //   let html = convertToHTML(editorState.getCurrentContent());
  //   setConvertedContent(html);
  // }, [editorState]);
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
              // editorRef={(ref) => {
              //     // ref?.focus();
              //   }}
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
    </>
  )
}

export default TextBody;