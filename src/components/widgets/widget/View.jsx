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
            switch(comp.type) {
                case 'logic_widget':
                  return (
                    <Box
                        margin="10px 0px"
                        width="100%"
                    >
                      <Text
                          align="center"
                      >
                        Click To Add Logic
                      </Text>
                    </Box>
                  );
                case 'text_widget':
                    return (
                      <Box
                          margin="10px 0px"
                          width="100%"
                      >
                        <Text
                            align="left"
                            color="#858585"
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(props?.value),
                            }}
                            fontSize="14px"
                        />
                      </Box>
                    );
                case 'button_widget':
                    return (
                      <Box
                          display="flex"
                          justifyContent="row-start"
                          margin="10px 0px"
                          width="100%"
                      >
                        <Button
                            colorScheme='pink'
                            variant={props?.variant}
                        >
                          {props?.label}
                        </Button>
                      </Box>
                    );
                case 'image_widget':
                    return (<Box
                        margin="10px 0px"
                            >
                      <Box
                          alignItems="center"
                          display="flex"
                          flexDirection="column"
                          justifyContent="center"
                      >
                        { props?.file !== null ? (
                          <Image
                              alt="Preview"
                              borderRadius="0.3125rem"
                            // src={props?.file}
                            // src={`data:image/png;base64,${props?.file}`}
                              src={`data:image/png;base64,${props?.file}`}
                          />
                        ) : null }

                        <br />

                        { props?.link !== null ? (
                          <Image
                              alt="Preview"
                              borderRadius="0.3125rem"
                              src={props?.link}
                          />
                        ) : null}
                      </Box>

                      {props?.link === null && props?.file === null ? ( 
                        <>
                          <Image 
                              alt="Preview"
                              borderRadius="0.3125rem"
                              height="300px"
                              objectFit="contain"
                              src="/jpgs/dummy-image-square.jpeg"
                              width="100%"
                          />

                          <Button
                              _hover={{ backgroundColor: 'primary.90', color: "white" }}
                              colorScheme='button'
                              fontSize="xs"
                              variant="outline"
                          >
                            Upload Image
                          </Button>
                        </>
                      ) : null}

                    </Box>);
                case 'calendar_widget':
                    return  (
                      <Box
                          margin="10px 0px"
                      >
                        <Calendar
                            onlyMonthPicker={props?.type === 'monthly' ? true : false}
                            onlyYearPicker={props?.type === 'yearly' ? true : false}
                            range={props?.multiple ? true : false}
                            shadow={false}
                            value={props?.value}
                        />

                        {/* <Text
                            color="#858585"
                            fontFamily="Inter"
                            fontSize="lg"
                            fontWeight={400}
                            margin="10px 0px"
                        >
                          Select date on which you want to see your transaction details
                        </Text> */}
                      </Box>
                    );
                case 'carousel_widget':
                    return (<Box
                        margin="10px 0px"
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
                            {card?.file !== null && card?.file !== '' ? (
                              <Image
                                  alt="Preview"
                                  borderRadius="0.3125rem"
                                  height="300px"
                                  objectFit="contain"
                                  src={`data:image/png;base64,${card.file}`}
                              />
                            ) : ( 
                              <Image 
                                  alt="Preview"
                                  borderRadius="0.3125rem"
                                  height="300px"
                                  objectFit="contain"
                                  src="/jpgs/dummy-image-square.jpeg"
                                  width="100%"
                              />
                          )}

                            <br />

                            <Text
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(card?.text),
                                }}
                            />

                            {card?.buttonProps?.show ? <Box
                                display="flex"
                                justifyContent="row-start"
                                margin="10px 0px"
                                width="100%"
                                                       >
                              <Button
                                  colorScheme='pink'
                                  variant={card?.buttonProps?.variant}
                              >
                                {card?.buttonProps?.label}
                              </Button>
                            </Box> : null}
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