/* eslint-disable */ 
import React, { useState, useEffect } from "react";
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

const TextBody = (props) => {
  const [showCaptureResponse, setShowCaptureResponse] = useState(false);
  const { comp, components, setComp, type } = props;
  const [editorList, setEditorList] = useState(comp.props.value === 'Add something here' ? [comp.props.value] : [comp.props.value, ...comp.variants]);
  const [showFallBack,setShowFallBack] = useState(false)
  const [fallBackMsgOne, setFallBackMsgOne] = useState(comp.fallback_messages ? comp.fallback_messages[0] : '');
  const [fallBackMsgTwo, setFallBackMsgTwo] = useState(comp.fallback_messages ? comp?.fallback_messages[1] : '');
  const deleteNode = () => {
    if (components.length === 1) {
      alert("Node should contain at least 1 widget!");
      return;
    }
    const newData = components.filter((data) => data.order !== comp.order);
    setComp(newData);
  };

  return (
    <>
      <Box
          display="flex"
          justifyContent="space-between"
          position="relative"
      >
        <Box
            marginLeft="10px"
            width="93%"
        >
         {/* Editor Component */}
         {editorList.map((item,index) => <EditorComponent comp={comp} 
         components={components} setComp={setComp} item={item}
         setEditorList={setEditorList} index={index} 
         editorList={editorList}

         />)}
          <Box
          marginTop={"10px"}
          >
            {type === "customer_response_node" ? <Checkbox
                color="text.body"
                iconColor='blue.400'
                iconSize='1rem'
                onChange={() => {setShowCaptureResponse(!showCaptureResponse);}}
            >
              Capture response
            </Checkbox> : <Checkbox
            color="text.body"
            iconColor='#FF5574'
            _checked={{
              "& .chakra-checkbox__control": { background: "white", border: "2px solid #ECECEC", outline:"none", borderRadius:'2px' }
            }} 
            iconSize='1rem'
            onChange={() => setShowFallBack(prevState => !prevState)}
        >
          Question
        </Checkbox>
        }
      </Box>
      <Box marginTop={"20px"}>
        {/* Here i will show fallback message editor */}
        {showFallBack && (<>
          <FallBackMessageEditor  fallBackMsgOne={fallBackMsgOne} setFallBackMsgOne={setFallBackMsgOne} comp={comp} 
         components={components} setComp={setComp} />
         <FallBackMessageEditorOne  fallBackMsgTwo={fallBackMsgTwo} setFallBackMsgTwo={setFallBackMsgTwo} comp={comp} 
         components={components} setComp={setComp} />
        </>)}
        </Box>
        </Box>
        <Box
            cursor="pointer"
            onClick={() => deleteNode()}
            style={{height: 'fit-content'}}
        >
          <Icon
              color='hsla(0, 0%, 85%, 1)'
              icon="ic:outline-delete"
          />
        </Box>
      </Box>


      {type === "customer_response_node" && showCaptureResponse ? <>
        <Box
            marginLeft="10px"
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
            marginLeft="10px"
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

      {type !== "customer_response_node" && (
        <>
          <Divider
              borderColor="#D8D8D8"
              marginLeft="10px"
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
                onClick={() => {
                  const newList = [...editorList, ''];
                  setEditorList(newList)
                }}
                size="sm"
                width="118px"
            >
              Add Variant
            </Button>
          </Box>
        </>
      )}
    </>
  )
};

export default TextBody;


// function to add linrBreaks ...
function replaceEmptyPTagWithBrTa(htmlString) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  const paragraphs = doc.querySelectorAll('p');

  paragraphs.forEach(paragraph => {
    if (!paragraph.textContent.trim()) {
      paragraph.innerHTML = '<br>';
    }
  });

  return doc.body.innerHTML;
}


const EditorComponent = ({comp, components, setComp, setEditorList, index, item, editorList }) => {
  const [convertedContent, setConvertedContent] = useState(item);
  const [editorState, setEditorState] = useState(() => {
    const contentState = stateFromHTML(convertedContent);
    return EditorState.createWithContent(contentState);
  });

  useEffect(() => {
    const contentState = editorState.getCurrentContent();
    contentState.getBlockMap().forEach(block => {
      block.getText();
      block.getInlineStyleAt(0).toJS();
    });
    const html = convertToHTML(editorState.getCurrentContent());
    // setting new editor state 
    let newList = editorList;
    newList[index] = html;
    setEditorList(newList);
    setConvertedContent(html);
  }, [editorState]);

  useEffect(() => {
    const firstEditor = editorList[0];
    // Remove the first item from editorList to only store the variants in the variants array.
    const updatedEditorList = editorList.slice(1);
    const variants = updatedEditorList.map((item) => item);
    const arr = components?.map((item) => {
      if (item.order === comp.order) {
        item.props = {
          ...item.props,
          value: firstEditor
        };
        item.variants = variants
      }
      return item
    });
    setComp(arr);
  }, [convertedContent]);


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
  }, []);

  useEffect(() => {
    const contentState = editorState.getCurrentContent();
    let html = '';

    contentState.getBlockMap().forEach(block => {
      let blockHtml = '';

      // Get block text
      const text = block.getText();

      // Check if block has any inline styles
      if (block.getInlineStyleAt(0).size !== 0) {
        // Apply inline styles
        blockHtml += text.split('').map((char, index) => {
          const styles = block.getInlineStyleAt(index);
          let styledChar = char;
          styles.forEach(style => {
            switch (style) {
              case 'BOLD':
                styledChar = `<strong>${styledChar}</strong>`;
                break;
              case 'ITALIC':
                styledChar = `<em>${styledChar}</em>`;
                break;
              case 'UNDERLINE':
                styledChar = `<u>${styledChar}</u>`;
                break;
              case 'STRIKETHROUGH':
                styledChar = `<s>${styledChar}</s>`;
                break;
              default:
                break;
            }
          });
          return styledChar;
        }).join('');
      } else {
        // No inline styles, use plain text
        blockHtml = text;
      }

      html += `<p>${blockHtml}</p>`;
    });

    html = replaceEmptyPTagWithBrTa(html);
    setConvertedContent(html);
  }, [editorState]);

  const deleteVariant = (editorIndex) => {
    delete editorList[editorIndex];
    setEditorList(editorList);
    
    const clearArray = editorList.filter(i => i);
    const firstEditor = clearArray[0];
    // Remove the first item from clearArray to only store the variants in the variants array.
    const updatedEditorList = clearArray.slice(1);
    const variants = updatedEditorList.map((item) => item);
    const arr = components?.map((item) => {
      if (item.order === comp.order) {
        item.props = {
          ...item.props,
          value: firstEditor
        };
        item.variants = variants
      }
      return item
    });
    setComp(arr);
  }

  return(
    <Box
      display="flex"
      margin={index !== 0 ? "20px 0px" : "0px"}
    >
    <Editor
          editorClassName="editor-class nopan nodrag"
          editorState={editorState}
          onEditorStateChange={setEditorState}
          placeholder="Add text here"
          tabIndex={0}
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
            toolbarClassName="toolbar-class nopan nodrag"
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
    {index !== 0 && <Box
        cursor="pointer"
        onClick={() => deleteVariant(index)}
        style={{height: 'fit-content'}}
    >
      <Icon
          color='hsla(0, 0%, 85%, 1)'
          icon="ic:outline-delete"
      />
    </Box>}
    </Box>
  )
}

const FallBackMessageEditor = ({comp, components, setComp, fallBackMsgOne, setFallBackMsgOne}) => {
  const [convertedContent, setConvertedContent] = useState(fallBackMsgOne);
  const [editorState, setEditorState] = useState(() => {
    const contentState = stateFromHTML(convertedContent);
    return EditorState.createWithContent(contentState);
  });

  useEffect(() => {
    const contentState = editorState.getCurrentContent();
    contentState.getBlockMap().forEach(block => {
      block.getText();
      block.getInlineStyleAt(0).toJS();
    });
    const html = convertToHTML(editorState.getCurrentContent());
    // setting new editor state based on index
    setFallBackMsgOne(html);
    setConvertedContent(html);
  }, [editorState]);

  useEffect(() => {
    const arr = components?.map((item) => {
      if (item.order === comp.order) {
        item.props = {
          ...item.props,
          value: item.props.value
        };
        try {
          item.fallback_messages = [convertedContent, item.fallback_messages[1]];
        } catch(error) {
          item.fallback_messages = [convertedContent, ''];
        }
      }
      return item
    });
    setComp(arr);
  }, [convertedContent]);


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
  }, []);  

useEffect(() => {
  const contentState = editorState.getCurrentContent();
  let html = '';

  contentState.getBlockMap().forEach(block => {
    let blockHtml = '';

    // Get block text
    const text = block.getText();

    // Check if block has any inline styles
    if (block.getInlineStyleAt(0).size !== 0) {
      // Apply inline styles
      blockHtml += text.split('').map((char, index) => {
        const styles = block.getInlineStyleAt(index);
        let styledChar = char;
        styles.forEach(style => {
          switch (style) {
            case 'BOLD':
              styledChar = `<strong>${styledChar}</strong>`;
              break;
            case 'ITALIC':
              styledChar = `<em>${styledChar}</em>`;
              break;
            case 'UNDERLINE':
              styledChar = `<u>${styledChar}</u>`;
              break;
            case 'STRIKETHROUGH':
              styledChar = `<s>${styledChar}</s>`;
              break;
            default:
              break;
          }
        });
        return styledChar;
      }).join('');
    } else {
      // No inline styles, use plain text
      blockHtml = text;
    }

    html += `<p>${blockHtml}</p>`;
  });

  html = replaceEmptyPTagWithBrTa(html);
  setConvertedContent(html);
}, [editorState]);

  return(
    <>
    <Text color="text.body" fontSize={"10px"}>Fall Back Message 1</Text>
    <Editor
    editorClassName="editor-class nopan nodrag"
    editorState={editorState}
    onEditorStateChange={setEditorState}
    placeholder="Add text here"
    tabIndex={0}
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
    toolbarClassName="toolbar-class nopan nodrag"
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
<br/>
</>
)
} 

const FallBackMessageEditorOne = ({comp, components, setComp, index, fallBackMsgTwo, setFallBackMsgTwo}) => {
  const [convertedContent, setConvertedContent] = useState(fallBackMsgTwo);
  const [editorState, setEditorState] = useState(() => {
    const contentState = stateFromHTML(convertedContent);
    return EditorState.createWithContent(contentState);
  });

  useEffect(() => {
    const contentState = editorState.getCurrentContent();
    contentState.getBlockMap().forEach(block => {
      block.getText();
      block.getInlineStyleAt(0).toJS();
    });
    const html = convertToHTML(editorState.getCurrentContent());
    // setting new editor state based on index
    setFallBackMsgTwo(html);
    setConvertedContent(html);
  }, [editorState]);

  useEffect(() => {
    const arr = components?.map((item) => {
      if (item.order === comp.order) {
        item.props = {
          ...item.props,
          value: item.props.value
        };
        try {
          item.fallback_messages = [item.fallback_messages[0], convertedContent];
        } catch(error) {
          item.fallback_messages = ['', convertedContent];
        }
      }
      return item
    });
    setComp(arr);
  }, [convertedContent]);


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
  }, []);  

useEffect(() => {
  const contentState = editorState.getCurrentContent();
  let html = '';

  contentState.getBlockMap().forEach(block => {
    let blockHtml = '';

    // Get block text
    const text = block.getText();

    // Check if block has any inline styles
    if (block.getInlineStyleAt(0).size !== 0) {
      // Apply inline styles
      blockHtml += text.split('').map((char, index) => {
        const styles = block.getInlineStyleAt(index);
        let styledChar = char;
        styles.forEach(style => {
          switch (style) {
            case 'BOLD':
              styledChar = `<strong>${styledChar}</strong>`;
              break;
            case 'ITALIC':
              styledChar = `<em>${styledChar}</em>`;
              break;
            case 'UNDERLINE':
              styledChar = `<u>${styledChar}</u>`;
              break;
            case 'STRIKETHROUGH':
              styledChar = `<s>${styledChar}</s>`;
              break;
            default:
              break;
          }
        });
        return styledChar;
      }).join('');
    } else {
      // No inline styles, use plain text
      blockHtml = text;
    }

    html += `<p>${blockHtml}</p>`;
  });

  html = replaceEmptyPTagWithBrTa(html);
  setConvertedContent(html);
}, [editorState]);

  return(
    <>
    <Text color="text.body" fontSize={"10px"}>Fall Back Message 2</Text>
    <Editor
    editorClassName="editor-class nopan nodrag"
    editorState={editorState}
    onEditorStateChange={setEditorState}
    placeholder="Add text here"
    tabIndex={0}
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
    toolbarClassName="toolbar-class nopan nodrag"
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
<br/>
</>
)
} 
