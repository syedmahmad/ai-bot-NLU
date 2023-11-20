export const botNodeValidations = (selectedNode) => {
    // return if there is no node selected and user clicks on wdiget.
    if (!selectedNode || Object.keys(selectedNode).length === 0) {
     alert(
       'Parent node not selected. Please select the node from where you wanted to create new node.',
     );
     return false;
   } else if (selectedNode?.data?.nodeType === "bot") {
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
    } else if (selectedNode.data.nodeType === "start") {
      alert(
        'You cannot start a flow with Customer Reponse. Flow should start with Bot response.',
      );
      return false;
    } else if (selectedNode?.data?.nodeType === "customer") {
      alert(
        'Sorry! You are not able to create new Customer Response node due to restrictions. Try Bot Response',
      );
      return false;
    }
    return true;
  }