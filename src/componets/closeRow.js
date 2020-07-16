const closeRow = (rowMap, rowKey) => {
    console.log(rowKey)
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  export default closeRow;