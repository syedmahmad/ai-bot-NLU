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
                    return (<Text dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(props?.value),
                    }}
                            />);
                case 'button':
                    return (<Button
                        colorScheme='teal'
                        variant={props?.variant}
                            >
                      {props?.label}
                    </Button>);
                case 'image':
                    return <>
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

                                        </>;
                case 'calendar':
                    return  <Calendar
                        onlyMonthPicker={props?.type === 'monthly' ? true : false}
                        onlyYearPicker={props?.type === 'yearly' ? true : false}
                        range={props?.multiple ? true : false}
                        value={props?.value}
                    />;
                case 'carousal':
                    return <>
                        {props?.cards.map((card) => {
                            return (<Box>
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
                    </>;
                default:
                    return null;
            }
        })
      }
    </>
  );
}

export default ViewComponent;