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
    let _it;
    _it = it.sll;
    _it = it.process = it.status;
    _it = it.foodItem = it?._id;
    _it = it.typePrice = it?.price[0].typePrice;
    _it = it.noteDetail = it?.note;
    return _it;
  });
};
