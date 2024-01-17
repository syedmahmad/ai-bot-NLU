import { MarkerType } from 'reactflow';
import { Box } from '@chakra-ui/react';
import React from 'react';


export const prepareDataForAPIs = (edges, nodes, document) => {

    const newEdges = edges?.map((item) => {
        return {
            id: item.id,
            source: item.source,
            target: item.target
        }
    });

    const newNodes = nodes?.map((item) => {
        switch(item.type) {
            case "bot_response_node":
                return {
                    type: item.type,
                    id: item.id,
                    position: item.position,
                    height: item.height,
                    width: item.width,
                    data: {
                        type: item?.data?.type,
                        source_handle: item?.data?.sourceHandle,
                        components: item?.data?.components
                    }
                } 
            case "customer_response_node":
                return {
                    type: item.type,
                    id: item.id,
                    position: item.position,
                    height: item.height,
                    width: item.width,
                    data: {
                        type: item?.data?.type,
                        source_handle: item?.data?.sourceHandle,
                        components: item?.data?.components
                    }
                }
            case "input":
                return {
                    type: "input_node",
                    id: item.id,
                    position: item.position,
                    height: item.height,
                    width: item.width,
                    data: {
                        type: "input_node",
                        source_handle: item.id,
                        components: [{
                            type: "text_widget",
                            order: 1,
                            props: {value: "<h1>Start Flow</h1>"}
                        }]
                    }
                }
            default:
                return null
        }
    }).filter((item) => item !== undefined);


    return { ...document, edges: newEdges, nodes: newNodes }
} 

export const prepareDataForReactFlow = (document, onNodeClick, selectedNode) => {

    const { nodes, edges } = document;
    const newEdges = edges?.map((item) => {
        return {
            id: item.id,
            source: item.source,
            target: item.target,
            sourceHandle: item.target,
            // to show the arrows in connection instead of dot.
            markerEnd: {
            type: MarkerType.Arrow,
            width: 30,
            height: 30,
            color: '#D8D8D8',
            },
            style: { stroke: '#D8D8D8' },
            }
    });

    const newNodes = nodes?.map((item) => {
        switch(item.type) {
            case "bot_response_node":
                return {
                    type: item.type,
                    id: item.id,
                    position: item.position,
                    height: item.height,
                    width: item.width,
                    data: {
                        type: item?.data?.type,
                        sourceHandle: item?.data?.source_handle,
                        components: item?.data?.components,
                        onNodeClick: onNodeClick,
                        selectedNode: selectedNode,
                        widgetName: item?.data?.components[0]?.type,
                    },
                    style: {
                        backgroundColor: 'transparent',
                        boxShadow: '#AADBFF',
                    },
                    background: 'transparent',
                } 
            case "customer_response_node":
                return {
                    type: item.type,
                    id: item.id,
                    position: item.position,
                    height: item.height,
                    width: item.width,
                    data: {
                        type: item?.data?.type,
                        sourceHandle: item?.data?.source_handle,
                        components: item?.data?.components,
                        onNodeClick: onNodeClick,
                        selectedNode: selectedNode,
                        widgetName: item?.data?.components[0]?.type,
                    },
                    style: {
                        backgroundColor: 'transparent',
                        boxShadow: '#AADBFF',
                    },
                    background: 'transparent',
                }
            case "input_node":
                return {
                        id: item.id,
                        type: 'input',
                        position: { x: 700, y: 10 },
                        data: { 
                          label: <Box
                              alignItems="center" 
                              backgroundColor="white" 
                              border="1px solid" 
                              borderColor="secondary.20" 
                              borderRadius="5px" 
                              color="text.body" 
                              data-id={item.id} 
                              display="flex" 
                              fontFamily="Inter" 
                              fontSize="21px" 
                              fontWeight={400} 
                              height={54} 
                              justifyContent="center" 
                              width={164}
                                 >
                            Start Flow
                          </Box>,
                          type: 'start',
                       },
                        style: {
                          width: 184,
                          height: 82,
                          padding: '9px 10px',
                          backgroundColor: '#AADBFF',
                          borderColor: '#ECECEC'
                        },
                      }
            default:
                return null
        }
    }).filter((item) => item !== undefined);


    return { newEdges, newNodes }
} 