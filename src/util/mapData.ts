import lodash from 'lodash';
export const mapDataListTable = (data: any) => {
  let dataMain = [];
  let dataCache = lodash.cloneDeep(data);
  while (dataCache?.length != 0) {
    lodash.forEach(dataCache, (item: any, index: any) => {
      if (dataCache.length == 1) {
        return dataMain.push(dataCache?.splice(0, 1));
      }
      if (index % 2 == 0) {
        dataMain.push(dataCache?.splice(0, 3));
      } else {
        dataMain.push(dataCache?.splice(0, 2));
      }
    });
  }
  return dataMain;
};
export const mapOrderFood = (data: any) => {
  return data?.map((it) => {
    const _it = {
      orderQuantity: it?.sll,
      process: 1,
      foodItem: it?._id,
      typePrice: it?.price[0]._id,
      noteDetail: it?.note,
      waitingQuantity: it?.sll,
      completedQuantity: 0,
    };
    return _it;
  });
};
export const mapUpdateOrderFood = (
  data: any,
  typeAction: 0 | 1,
  sll: number,
) => {
  const completedQuantity = typeAction == 0 ? 0 : sll;
  const _it = {
    ...data,
    process: 2,
    waitingQuantity: data?.orderQuantity - sll,
    completedQuantity: completedQuantity,
  };
  return _it;
};
