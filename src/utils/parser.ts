export const parser = (edges, nodes, document) => {

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
                break;
            default:
                return null
        }
    }).filter((item) => item !== undefined);


    return { ...document, edges: newEdges, nodes: newNodes }
} 