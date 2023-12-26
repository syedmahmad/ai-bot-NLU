export const createTableData = (res) => {
  let arr = [];

  res.data.items.forEach((item) => {
    const date_update_at = new Date(item.audit.updated_at);
    const date_created_at = new Date(item.audit.created_at);
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    const obj = {
      name: item.name,
      description: item.description,
      id: item.id,
      is_deleted: item.is_deleted,
      created_at: date_created_at.toLocaleDateString('en-US', options),
      updated_at: date_update_at.toLocaleDateString('en-US', options),
      edges: item?.edges,
      nodes: item?.nodes
    }
    arr.push(obj);
  });

  return arr;
}