const DetailExtraction = () => {
  const extract1 = (array) => {
    let firstList = [];
    array.forEach((element) => {
      firstList.push(element.item.id);
    });
    return firstList;
  };

  const extract2 = (array) => {
    let secondList = [];
    array.forEach((element) => {
      secondList.push(element.ticker_symbol);
    });
    return secondList;
  };

  let firstList = extract1(dataArray);
  // console.log(firstList);
  let secondList = extract2(testArray);
  // console.log(secondList);

  const intersect = firstList.filter((element) => secondList.includes(element));

  console.log(intersect);
};

export default DetailExtraction;
