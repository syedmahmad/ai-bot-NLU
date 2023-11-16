/* eslint-disable */
import React, { memo, useState, useEffect, useRef } from 'react';
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
import { Icon } from '@iconify/react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import { Handle, Position } from 'reactflow';

export default memo(({ data, isConnectable }: any) => {
  const boldIcon = <Icon icon="octicon:bold-16" color="hsl(0, 0%, 85%)" />
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  );
  const [convertedContent, setConvertedContent] = useState(null);

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
        type="target"
        position={Position.Top}
        onConnect={(params) => console.log('handle onConnect', params)}
        style={{ background: '#000' }}
        isConnectable={isConnectable}
      />
      <Popover placement="left-start" isLazy>
        <PopoverTrigger>
          <Box
            style={{
              background: '#fff',
              height: 'fit-content',
              width: '300px',
            }}
            onClick={handleClick}
          >
            <Box
              width="100%"
              height="100%"
              background="#D1EAFE"
              borderRadius="17.487px 17.487px 0px 17.487px"
              padding={4}
            >
              <Box
                width="100%"
                height="68px"
                background="#fff"
                borderRadius="17.487px 17.487px 0px 17.487px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(convertedContent),
                }}
              ></Box>
            </Box>
            {/* <img src="https://via.placeholder.com/300.png/09f/fff" alt="Girl in a jacket" width="100" height="100" /> */}
          </Box>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          {/* <PopoverCloseButton /> */}
          <PopoverHeader>Text</PopoverHeader>
          <PopoverBody>
            <Editor
              editorRef={(ref) => {
                ref?.focus();
              }}
              editorState={editorState}
              onEditorStateChange={setEditorState}
              wrapperClassName="wrapper-class"
              editorClassName="editor-class"
              toolbarClassName="toolbar-class"
              toolbar={{
                image: {
                  alt: { present: true, mandatory: false },
                  previewImage: true,
                  inputAccept: "svg"
                },
                options: ['inline', 'link'],
                inline: {
                  inDropdown: false,
                  options: ['bold', 'italic', 'underline', 'strikethrough'],
                  bold: {
                    icon: "/icons/bold"
                  }
                },
                link: {
                  inDropdown: false,
                  options: ['link'],
                },
              }}
              toolbarCustomButtons={[
                <div onClick={() => alert('Coming Soon!')} className='insert-entity'>Insert Entity</div>,
              ]}
            />
          </PopoverBody>
        </PopoverContent>
      </Popover>
      {/* handle={type="source"} means
          (isConnectableStart?) Dictates whether a connection can start from this handle.
      */}
      <Handle
        id={data.sourceHandle}
        position={Position.Bottom}
        type="source"
        onConnect={(params) => console.log('handle onConnect', params)}
        style={{ background: '#000' }}
        isConnectable={isConnectable}
      />
    </>
  );
});
