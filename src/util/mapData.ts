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
      orderQuantity: it.sll,
      process: it.status,
      foodItem: it?._id,
      typePrice: it?.price[0]._id,
      noteDetail: it?.note,
      waitingQuantity: it.sll,
      completedQuantity: 0,
    };
    return _it;
  });
};
