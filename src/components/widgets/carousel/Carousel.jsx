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
  Select,
  Image,
  Text,
  Button,
  Checkbox,
  Input,
} from '@chakra-ui/react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { Icon } from '@iconify/react';
import { convertToHTML } from 'draft-convert';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useWidgets } from '../../context/WidgetsContext';
import DOMPurify from 'dompurify';

function CarouselComponent({ data, isConnectable }) {
  const { widget } = useWidgets();
  const [file, setFile] = useState('');
  const [title, setTitle] = useState('');
  const [btnType, setBtnType] = useState('');
  const [btnLabel, setBtnLabel] = useState('');
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  );

  const [convertedContent, setConvertedContent] = useState('');

  useEffect(() => {
    let html = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(html);
  }, [editorState]);

  // useEffect(() => {
  //   setFile(url);
  // }, [url]);

  console.log("widget", widget);

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
                background="#D1EAFE"
                borderRadius="17.487px 17.487px 0px 17.487px"
                padding={4}
                width="100%"
            >
              <Box
                  alignItems="center"
                  background="#fff"
                  borderRadius="17.487px 17.487px 0px 17.487px"
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  minHeight="68px"
                  padding="25px 28px"
                  width="100%"
              >
                {file ? <Image
                    alt="Preview"
                    borderRadius="0.3125rem"
                    src={file}
                        /> : null}

                <Box>
                  {title}
                </Box>

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

                <Button
                    colorScheme='teal'
                    variant={btnType}
                >
                  {btnLabel}
                </Button>
              </Box>
            </Box>

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
              Carousel
            </Box>

            <Box>
              <Icon
                  color='hsla(0, 0%, 85%, 1)'
                  icon="bi:three-dots-vertical"
              />
            </Box>
          </PopoverHeader>

          <PopoverBody
              padding="20px"
          >
            <Select
                backgroundColor="hsla(0, 0%, 97%, 1)"
                border="none"
                borderRadius="0.3125rem"
                marginBottom="5px"
                placeholder='Card 1'
                size="sm"
                value="Card 1"
            >
              <option
                  selected
                  value='card_1'
              >
                Card 1
              </option>

              <option value='card_2'>
                Card 2
              </option>

              <option value='card_3'>
                Card 3
              </option>
            </Select>

            <Select
                backgroundColor="hsla(0, 0%, 97%, 1)"
                border="none"
                borderRadius="0.3125rem"
                margin="10px 0px"
                placeholder='Card 2'
                size="sm"
                value="Card 2"
            >
              <option
                  selected
                  value='card_1'
              >
                Card 1
              </option>

              <option value='card_2'>
                Card 2
              </option>

              <option value='card_3'>
                Card 3
              </option>
            </Select>

            {file ? <Image
                alt="Preview"
                borderRadius="0.3125rem"
                src={file}
                width="93%"
                    /> : null}

            {file ? null : (
              <>
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
                        _hover={{ backgroundColor: 'primary.90' }}
                        backgroundColor="primary.100"
                        borderRadius="0.25rem"
                        color="white"
                        height="1.75rem"
                        onClick={() => document.getElementById("file").click()}
                        width="7.375rem"
                    >
                      Upload
                    </Button>

                    <Input
                        id="file"
                        onChange={(e) =>
                  setFile(URL.createObjectURL(e.target.files[0]))}
                        style={{display: "none"}}
                        type="file"
                    />
                  </Box>
                </Box>
              </>
            )}

            <Text
                color="text.body"
                fontSize="xs"
            >
              Title
            </Text>

            <Input
                borderRadius="0.3125rem"
                marginBottom="10px"
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Add url here"
                size="sm"
                width="100%"
            />

            <Box
                display="flex"
                justifyContent="space-between"
            >
              <Box
                  width="100%"
              >
                <Editor
                    editorClassName="editor-class"
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
            </Box>

            <Box marginTop="10px">
              <Checkbox
                  color="text.body"
                  iconColor='blue.400'
                  iconSize='1rem'
              >
                Add Buttons
              </Checkbox>
            </Box>

            <br />

            <Text
                color="text.body"
                fontSize="xs"
            >
              Button Label
            </Text>

            <Input
                borderRadius="0.3125rem"
                onChange={(e) => setBtnLabel(e.target.value)}
                placeholder="Type here"
                size="sm"
            />

            <br />

            <br />

            <Text
                color="text.body"
                fontSize="xs"
            >
              Button Type
            </Text>

            <Select
                onChange={(e) => setBtnType(e.target.value)}
                placeholder='Button Type'
                size="md"
                value={btnType}
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

export default CarouselComponent;
