import uniqid from 'uniqid';

export const botNodeValidations = (selectedNode) => {
    // return if there is no node selected and user clicks on wdiget.
    if (!selectedNode || Object.keys(selectedNode).length === 0) {
     alert(
       'Parent node not selected. Please select the node from where you wanted to create new node.',
     );
     return false;
   } else if (selectedNode?.type === "bot") {
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
    } else if (selectedNode.data.type === "start") {
      alert(
        'You cannot start a flow with Customer Reponse. Bot will initiate the FLow.',
      );
      return false;
    } else if (selectedNode?.type === "customer") {
      alert(
        "Sorry! You're not able to create customer response form customer response. There should be bot response after customer response.",
      );
      return false;
    }
    return true;
  }

  export const createFields = (widget) => {
    console.log(widget);
    switch(widget) {
      case 'customer':
      case 'text':
        return {
          props: {
            value: "Add something here"
          } 
        }
      case 'button':
        return {
          props: {
            label: "new button",
            variant: "solid"
          } 
        }
      case 'image':
        return {
          props: {
            file: null,
            link: null
          } 
        }
      case 'calendar':
        return {
          props: {
            type: 'daily',
            multiple: false,
            value: new Date()
          } 
        }
      case 'carousel':
        return {
          props: {
            cards: [
              {
                id: uniqid(),
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