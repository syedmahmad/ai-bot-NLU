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

  // one node can have multiple components so, based on their order, we
  // are updating them.
  useEffect(() => {
    const arr = components?.map((item) => {
      if (item.order === comp.order) {
        item.props = {
          link: url,
          file: item.props.file
        };
        item.image_base64 = item.props.file;
        item.image_url = url;
      }
      return item
    });
    setComp(arr);
  }, [url]);

  useEffect(() => {
    const arr = components?.map((item) => {
      if (item.order === comp.order) {
        item.props = {
          link: item.props.link,
          file: file
        };
        item.image_base64 = file;
        item.image_url = item.props.link;
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

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    const convertedFile = base64?.replace(/^data:image\/[a-z]+;base64,/, "");
    setFile(convertedFile);
  };

  return(
    <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        marginLeft="10px"
        width="100%"
    >
      {file !== null ? (
        <Box
            display="flex"
            justifyContent="space-between"
            width="100%"
        >

          <Image
              alt="Preview"
              borderRadius="0.3125rem"
            // src={file}
              src={`data:image/png;base64,${file}`}
              width="85%"
          />

          <span
              onClick={() => setFile(null)}
              style={{width: '10%', fontSize: '12px', cursor: "pointer"}}
          >
            &#10060;
          </span>
        </Box>
        ) :   <>
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
                  accept=".jpeg, .png, .jpg"
                  id="file"
                // onChange={(e) =>
                // setFile(URL.createObjectURL(e.target.files[0]))}
                  onChange={(e) => handleFileUpload(e)}
                  style={{display: "none"}}
                  type="file"
              />
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
        </>}

      <br />

      {url !== null ? (
        <Box 
            display="flex"
            justifyContent="space-between"
            width="100%"
        >
          <Image
              alt="Preview"
              borderRadius="0.3125rem"
            // src={file}
              src={url}
              width="85%"
          />

          <span
              onClick={() => setUrl(null)}
              style={{width: '10%', fontSize: '12px', cursor: "pointer"}}
          >
            &#10060;
          </span>

        </Box>
        ) : <> 
          {' '}

          <Text
              color="text.body"
              fontSize="xs"
          >
            Add Link
          </Text>

          <Input
              borderRadius="0.3125rem"
              onChange={(e) => {setUrl(e.target.value)}}
              placeholder="Add url here"
              size="sm"
              value={url}
              width="93%"
          />
        </>}

    </Box>
  )
}

export default ImageBody;