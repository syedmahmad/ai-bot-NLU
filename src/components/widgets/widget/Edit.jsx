import React from 'react';
import { Box, Divider, Heading } from '@chakra-ui/react';
import TextBody from '../../popoverBodies/Text';
import ButtonBody from '../../popoverBodies/Button';
import ImageBody from '../../popoverBodies/Image';
import CalendarBody from '../../popoverBodies/Calender';
import CarousalBody from '../../popoverBodies/Carousal';
import LogicBody from '../../popoverBodies/Logic';
import { Icon } from '@iconify/react';

function EditComponent({ initialRef, comps, setComp, node }) {
  return (
    <Box>
      { 
        comps.map((comp) => {
            switch(comp.type) {
                case 'logic_widget':
                    return (
                      <Box
                          margin="10px 0px"
                          width="100%"
                      >
                        <LogicBody
                            comp={comp}
                            components={comps}
                            setComp={setComp}
                        />
                      </Box>
                    );
                case 'text_widget':
                    return (
                      <>
                        <Box
                            margin="10px auto"
                            width="100%"
                        >
                          <Box
                              alignItems="center"
                              display="flex"
                              justifyContent="space-between"
                          >
                            <Heading
                                color="text.card"
                                fontSize="lg"
                                fontWeight={600}
                                lineHeight="20px"
                                margin="10px"
                            >
                              {node.type === "customer_response_node" ? "Customer Response" : "Text"}
                            </Heading>

                            <Box>
                              <Icon
                                  color='hsla(0, 0%, 85%, 1)'
                                  icon="bi:three-dots-vertical"
                                  onClick={() => alert('Coming Soon!')}
                              />
                            </Box>
                          </Box>

                          <TextBody
                              comp={comp}
                              components={comps}
                              ref={initialRef}
                              setComp={setComp}
                              type={node.type}
                          />
                        </Box>

                        {comps[comps.length-1].type === comp.type ? null : <Divider /> }
                      </>
                    );
                case 'button_widget':
                    return (
                      <>
                        <Box
                            margin="10px 0px"
                            width="100%"
                        >

                          <Box
                              alignItems="center"
                              display="flex"
                              justifyContent="space-between"
                          >
                            <Heading
                                color="text.card"
                                fontSize="lg"
                                fontWeight={600}
                                lineHeight="20px"
                                margin="10px"
                            >
                              Button
                            </Heading>

                            <Box>
                              <Icon
                                  color='hsla(0, 0%, 85%, 1)'
                                  icon="bi:three-dots-vertical"
                                  onClick={() => alert('Coming Soon!')}
                              />
                            </Box>
                          </Box>

                          <ButtonBody
                              comp={comp}
                              components={comps}
                              setComp={setComp}
                          />
                        </Box>

                        {comps[comps.length-1].type === comp.type ? null : <Divider width="100%" /> }
                      </>
                    );
                case 'image_widget':
                    return (
                      <>
                        <Box
                            margin="10px 0px"
                            width="100%"
                        >
                          <Box
                              alignItems="center"
                              display="flex"
                              justifyContent="space-between"
                          >
                            <Heading
                                color="text.card"
                                fontSize="lg"
                                fontWeight={600}
                                lineHeight="20px"
                                margin="10px"
                            >
                              Image
                            </Heading>

                            <Box>
                              <Icon
                                  color='hsla(0, 0%, 85%, 1)'
                                  icon="bi:three-dots-vertical"
                                  onClick={() => alert('Coming Soon!')}
                              />
                            </Box>
                          </Box>

                          <ImageBody
                              comp={comp}
                              components={comps}
                              setComp={setComp}
                          />
                        </Box>

                        {comps[comps.length-1].type === comp.type ? null : <Divider width="100%" /> }
                      </>
                    );
                case 'calendar_widget':
                    return  (
                      <>
                        <Box
                            margin="10px 0px"
                            width="100%"
                        >
                          <Box
                              alignItems="center"
                              display="flex"
                              justifyContent="space-between"
                          >
                            <Heading
                                color="text.card"
                                fontSize="lg"
                                fontWeight={600}
                                lineHeight="20px"
                                margin="10px"
                            >
                              Calendar
                            </Heading>

                            <Box>
                              <Icon
                                  color='hsla(0, 0%, 85%, 1)'
                                  icon="bi:three-dots-vertical"
                                  onClick={() => alert('Coming Soon!')}
                              />
                            </Box>
                          </Box>

                          <CalendarBody
                              comp={comp}
                              components={comps}
                              setComp={setComp}
                          />
                        </Box>

                        {comps[comps.length-1].type === comp.type ? null : <Divider width="100%" /> }
                      </>
                    );
                case 'carousel_widget':
                    return (
                      <>
                        <Box
                            margin="10px 0px"
                            width="100%"
                        >
                          <Box
                              alignItems="center"
                              display="flex"
                              justifyContent="space-between"
                          >
                            <Heading
                                color="text.card"
                                fontSize="lg"
                                fontWeight={600}
                                lineHeight="20px"
                                margin="10px"
                            >
                              Carousel
                            </Heading>

                            <Box>
                              <Icon
                                  color='hsla(0, 0%, 85%, 1)'
                                  icon="bi:three-dots-vertical"
                                  onClick={() => alert('Coming Soon!')}
                              />
                            </Box>
                          </Box>

                          <CarousalBody
                              comp={comp}
                              components={comps}
                              setComp={setComp}
                          />
                        </Box>

                        {comps[comps.length-1].type === comp.type ? null : <Divider width="100%" /> }
                      </>
                    );
                default:
                    return null;
            }
        })
  }
    </Box>
  );
}

export default EditComponent;