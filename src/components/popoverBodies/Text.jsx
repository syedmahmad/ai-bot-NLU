/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Checkbox,
  Button,
  Text,
  Input,
  Divider,
} from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import { EditorState, SelectionState, Modifier } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';
import { stateFromHTML } from 'draft-js-import-html';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const TextBody = React.forwardRef((props, ref) => {
  const { comp, components, setComp, type } = props;
  const [convertedContent, setConvertedContent] = useState(comp.props.value === 'Add something here' ? '' : comp.props.value);
  const [editorState, setEditorState] = useState(() => {
    const contentState = stateFromHTML(convertedContent);
    return EditorState.createWithContent(contentState);
  });
  // ref to manually add focus on the Box...
  const boxRef = useRef(null);

  useEffect(() => {
    const html = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(html);
  }, [editorState]);

  useEffect(() => {
    const arr = components?.map((item) => {
      if (item.order === comp.order) {
        item.props = {
          ...item.props,
          value: convertedContent
        };
      }
      return item;
    });
    setComp(arr);
  }, [convertedContent]);

  const deleteNode = () => {
    if (components.length === 1) {
      alert("Node should contain at least 1 widget!");
      return;
    }
    const newData = components.filter((data) => data.order !== comp.order);
    setComp(newData);
  };

  const moveSelectionToEnd = (editorState) => {
    const contentState = editorState.getCurrentContent();
    const blockMap = contentState.getBlockMap();
    const lastBlock = blockMap.last();
    const currentSelection = editorState.getSelection();

    // If the cursor is already at the end, do nothing
    if (
      currentSelection.getAnchorKey() === lastBlock.getKey() &&
      currentSelection.getAnchorOffset() === lastBlock.getLength()
    ) {
      return editorState;
    }

    // Create a selection at the end of the content
    const selection = new SelectionState({
      anchorKey: lastBlock.getKey(),
      anchorOffset: lastBlock.getLength(),
      focusKey: lastBlock.getKey(),
      focusOffset: lastBlock.getLength() + 1,
      // focusOffset: contentState.getBlockForKey(currentSelection.getAnchorKey()).getLength() + 1,

    });

    // Use Modifier to set the content of the last block to end with a space
    const contentWithSpace = Modifier.replaceText(
      contentState,
      selection,
      ' '
    );

    // Apply the updated content to the editor state
    const newEditorState = EditorState.push(
      editorState,
      contentWithSpace,
      'insert-characters'
    );

    // Move the selection to the end
    const editorStateWithSelection = EditorState.forceSelection(
      newEditorState,
      selection
    );

    // If backspace is pressed and the cursor is at the end, remove the space
    const afterBackspaceEditorState = handleBackspace(editorStateWithSelection);

    return afterBackspaceEditorState;
  };


  const handleBackspace = (editorState) => {
    const currentSelection = editorState.getSelection();
    const contentState = editorState.getCurrentContent();

    // Check if the backspace key is pressed and the cursor is at the end
    if (
      currentSelection.isCollapsed() &&
      currentSelection.getAnchorOffset() === 0 &&
      currentSelection.getAnchorKey() !== contentState.getFirstBlock().getKey()
    ) {
      // Get the previous block
      const beforeBlock = contentState.getBlockBefore(
        currentSelection.getAnchorKey()
      );

      // Calculate the new selection at the end of the previous block
      const newSelection = new SelectionState({
        anchorKey: beforeBlock.getKey(),
        anchorOffset: beforeBlock.getLength(),
        focusKey: beforeBlock.getKey(),
        focusOffset: beforeBlock.getLength(),
      });

      // Remove the space
      const contentWithoutSpace = Modifier.replaceText(
        contentState,
        newSelection,
        ''
      );

      // Apply the updated content to the editor state
      const newEditorState = EditorState.push(
        editorState,
        contentWithoutSpace,
        'remove-range'
      );

      // Move the selection to the end of the previous block
      const finalEditorState = EditorState.forceSelection(
        newEditorState,
        newSelection
      );

      return finalEditorState;
    }

    return editorState;
  };


  useEffect(() => {
    const contentState = stateFromHTML(convertedContent);
    const newEditorState = EditorState.createWithContent(contentState);
    const editorStateWithSelection = moveSelectionToEnd(newEditorState);

    setEditorState(editorStateWithSelection);
  }, [convertedContent]);

  useEffect(() => {
    if (ref) {
      ref.current.focusEditor();
    }
  }, [ref]);
  
  
  useEffect(() => {
    // Focus the box element when the component mounts
    if (boxRef.current) {
      boxRef.current.focus();
    }
  }, []);


  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
       
      >
        <Box
          width="93%"
          position= "relative"
          // z-index="99999999"
          // autoFocus
          // ref={boxRef}
          // tabIndex={0}
          // style={{ cursor: 'auto' }} 
          // onClick={moveCursorToEnd} 
        >
          <Editor
            ref={ref}
            tabIndex={0}
            editorClassName="editor-class"
            editorState={editorState}
            onEditorStateChange={setEditorState}
            placeholder="Add text here"
            toolbar={{
              image: {
                alt: { present: true, mandatory: false },
                previewImage: true,
                inputAccept: 'svg',
              },
              options: ['inline', 'link'],
              // options: ['inline', 'link', 'customText'],
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
