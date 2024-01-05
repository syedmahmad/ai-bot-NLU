// import uniqid from 'uniqid';

export const botNodeValidations = (selectedNode) => {
    // return if there is no node selected and user clicks on wdiget.
    if (!selectedNode || Object.keys(selectedNode).length === 0) {
     alert(
       'Parent node not selected. Please select the node from where you wanted to create new node.',
     );
     return false;
   } else if (selectedNode?.type === "bot_response_node") {
      return false;
    }
   return true;
 }

export const customerNodeValidations = (selectedNode) => {
    // return if there is no node selected and user clicks on wdiget.
    if (!selectedNode || Object.keys(selectedNode).length === 0) {
      alert(
        'Parent node not selected. Please select the node from where you wanted to create new node.',
      );
      return false;
    } else if (selectedNode?.type === "customer_response_node") {
      alert(
        "Sorry! You're not able to create customer response form customer response. There should be bot response after customer response.",
      );
      return false;
    } 
    // else if (selectedNode.data.type === "start") {
    //   alert(
    //     'You cannot start a flow with Customer Reponse. Bot will initiate the FLow.',
    //   );
    //   return false;
    // } 
    return true;
  }

  export const createFields = (widget) => {
    switch(widget) {
      case 'customer_response_node':
      case 'text_widget':
        return {
          props: {
            value: "Add something here"
          } 
        }
      case 'button_widget':
        return {
          props: {
            label: "new button",
            variant: "solid"
          } 
        }
      case 'image_widget':
        return {
          props: {
            file: null,
            link: null
          } 
        }
      case 'calendar_widget':
        return {
          props: {
            type: 'daily',
            multiple: false,
            value: new Date()
          } 
        }
      case 'carousel_widget':
        return {
          props: {
            cards: [
              {
                id: mongoObjectId(),
                label: 'card 1',
                file: null,
                text: "<h1>Hello <b>write something here</b></h1>"
              }
            ]
          }
        }
      default:
        return;
    }
  }


  export const mongoObjectId = function () {
    var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
        return (Math.random() * 16 | 0).toString(16);
    }).toLowerCase();
};