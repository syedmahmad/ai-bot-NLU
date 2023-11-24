/* eslint-disable */
import React from 'react';
import {
  Image,
  Text,
  Box,
  Button
} from '@chakra-ui/react';
import { Calendar } from "react-multi-date-picker";
import DOMPurify from 'dompurify';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

function ViewComponent({ components }) {
  return (
    <>
      { 
        components.map((comp) => {
            const props = comp?.props;
            switch(comp.name) {
                case 'text':
                    return (
                        <Box
                          width={"100%"}
                          margin="10px 0px"
                        >
                          <Text
                            align={"center"}
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(props?.value),
                            }}
                          />
                        </Box>
                            );
                case 'button':
                    return (
                      <Box
                        margin="10px 0px"
                      >
                        <Button
                            colorScheme='teal'
                            variant={props?.variant}
                                >
                          {props?.label}
                        </Button>
                    </Box>
                    );
                case 'image':
                    return <Box
                      margin={"10px 0px"}
                    >
                    { props?.file !== null ? <Image
                                        alt="Preview"
                                        borderRadius="0.3125rem"
                                        src={props?.file}
                                    /> : <Image
                                    alt="Preview"
                                    borderRadius="0.3125rem"
                                    src={props?.link}
                                />
                                    }

                                        </Box>;
                case 'calendar':
                    return  (
                      <Box
                        margin={"10px 0px"}
                      >
                        <Calendar
                            onlyMonthPicker={props?.type === 'monthly' ? true : false}
                            onlyYearPicker={props?.type === 'yearly' ? true : false}
                            range={props?.multiple ? true : false}
                            value={props?.value}
                        />
                      </Box>
                    );
                case 'carousal':
                    return <Box
                      display={"flex"}
                      justifyContent={"space-between"}
                      width={"94%"}
                    >
                        {props?.cards.map((card) => {
                            return (<Box
                              margin={"10px 0px"}
                            >
                                {card?.file !== null ? <Image
                                        alt="Preview"
                                        borderRadius="0.3125rem"
                                        src={card?.file}
                                    /> : <Image
                                    alt="Preview"
                                    borderRadius="0.3125rem"
                                    src={card?.link}
                                />}
                                <br />
                                <Text dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(card?.text),
                                }}
                                        />
                            </Box>)
                        })}
                    </Box>;
                default:
                    return null;
            }
        })
      }
    </>
  );
}

export default ViewComponent;