import React, { useState, useEffect } from "react";
import {
  Text,
  Input,
  Image,
  Box,
  Button
} from '@chakra-ui/react';
import { Icon } from '@iconify/react';

function ImageBody({ comp, setComp, components}) {
  const [url, setUrl] = useState(comp?.props?.link);
  const [file, setFile] = useState(comp?.props?.file);

  useEffect(() => {
    setFile(url);
  }, [url]);

  useEffect(() => {
    const arr = components?.map((item) => {
      if (item.order === comp.order) {
        item.props = {
          ...item.props,
          link: url,
          file: file
        }
      }
      return item
    });
    setComp(arr);
  }, [file]);

  const deleteNode = () => {
    if (components.length === 1) {
      alert("Node should contain atleast 1 widget!");
      return;
    }
    const newData = components.filter((data) => data.order !== comp.order);
    setComp(newData);
  }

  return(
    <>
      {file !== null ? (
        <Image
            alt="Preview"
            borderRadius="0.3125rem"
            src={file}
            width="93%"
        />
        ) : null}

      {file !== null ? null : (
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
                width="93%"
            >
              <Button
                  _hover={{ backgroundColor: 'primary.90', color: "white" }}
                  borderColor="primary.100"
                  borderRadius="0.25rem"
                  color="primary.100"
                  height="1.75rem"
                  onClick={() => document.getElementById("file").click()}
                  variant="outline"
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
        </>
            )}

      <Text
          color="text.body"
          fontSize="xs"
      >
        Add Link
      </Text>

      <Input
          borderRadius="0.3125rem"
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Add url here"
          size="sm"
          width="93%"
      />
    </>
  )
}

export default ImageBody;