
import React from 'react';
import {
  Image,
  Text,
  Box,
  Button
} from '@chakra-ui/react';
import { Calendar } from "react-multi-date-picker";
import Slider from "react-slick";
import DOMPurify from 'dompurify';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ViewComponent({ comps }) {
  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        // height="300px"
        // overflowX="hidden"
        // overflowY="auto"
        padding="10px"
    >
      { 
        comps.map((comp) => {
            const props = comp?.props;
            switch(comp.name) {
                case 'text':
                    return (
                      <Box
                          margin="10px 0px"
                          width="100%"
                      >
                        <Text
                            align="center"
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
                    return (<Box
                        margin="10px 0px"
                            >
                      { props?.file !== null ? (
                        <Image
                            alt="Preview"
                            borderRadius="0.3125rem"
                            src={props?.file}
                        />
                        ) : ( 
                          <Text
                              color="text.body"
                              fontSize="xs"
                          >
                            Upload Image
                          </Text>
                      )}

                    </Box>);
                case 'calendar':
                    return  (
                      <Box
                          margin="10px 0px"
                      >
                        <Calendar
                            onlyMonthPicker={props?.type === 'monthly' ? true : false}
                            onlyYearPicker={props?.type === 'yearly' ? true : false}
                            range={props?.multiple ? true : false}
                            value={props?.value}
                        />
                      </Box>
                    );
                case 'carousel':
                    return (<Box
                        margin="10px 0px"
                        padding="0px 20px"
                        width="94%"
                            >
                      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                      <Slider {...settings}>
                        {props?.cards.map((card) => (
                          <Box
                              display="flex!important"
                              flexDirection="column!important"
                              justifyContent="center!important"
                              key={card?.id}
                              width="100%"
                          >
                            {card?.file !== null ?(
                              <Image
                                  alt="Preview"
                                  borderRadius="0.3125rem"
                                  src={card?.file}
                              />
                                    ) : (
                                      <Image
                                          alt="Preview"
                                          borderRadius="0.3125rem"
                                          src={card?.link}
                                      />
                                  )}

                            <br />

                            <Text
                                align="center"
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(card?.text),
                                }}
                            />
                          </Box>
                            ))}
                      </Slider>
                    </Box>);
                default:
                    return null;
            }
        })
      }
    </Box>
  );
}

export default ViewComponent;