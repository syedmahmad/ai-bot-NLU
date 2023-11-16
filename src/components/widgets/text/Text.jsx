import React, { useState, useEffect } from 'react';
import { Handle, Position } from 'reactflow';
import {
  Box,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from '@chakra-ui/react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

function TextComponent({ data, isConnectable }) {
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
          style={{ background: '#000' }}
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
              background: '#fff',
              height: 'fit-content',
              width: '300px',
            }}
          >
            <Box
                background={data.nodeType === 'customer' ? "#FCD8E0" : "#D1EAFE"}
                borderRadius="17.487px 17.487px 0px 17.487px"
                height="100%"
                padding={4}
                width="100%"
            >
              <Box
                  alignItems="center"
                  background="#fff"
                  borderRadius="17.487px 17.487px 0px 17.487px"
                  dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(convertedContent),
                }}
                  display="flex"
                  height="68px"
                  justifyContent="center"
                  width="100%"
              />
            </Box>

            {/* <img src="https://via.placeholder.com/300.png/09f/fff" alt="Girl in a jacket" width="100" height="100" /> */}
          </Box>
        </PopoverTrigger>

        <PopoverContent>
          <PopoverArrow />

          {/* <PopoverCloseButton /> */}
          <PopoverHeader>
            Text
          </PopoverHeader>

          <PopoverBody>
            <Editor
                editorClassName="editor-class"
                editorRef={(ref) => {
                ref?.focus();
              }}
                editorState={editorState}
                onEditorStateChange={setEditorState}
                toolbar={{
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
                  <div onClick={() => alert('Coming Soon!')}>
                    Insert Entity
                  </div>,
              ]}
                wrapperClassName="wrapper-class"
            />
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
          style={{ background: '#000' }}
          type="source"
      />
    </>
  );
}

export default TextComponent;
