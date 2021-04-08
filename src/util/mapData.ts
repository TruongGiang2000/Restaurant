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
  data?.map((it) => {
    it.sll;
    it.process = it.status;
    it.foodItem = it?._id;
    it.typePrice = it?.price[0].typePrice;
    it.noteDetail = it?.note;
  });
};
