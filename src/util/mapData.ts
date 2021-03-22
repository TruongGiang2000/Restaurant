import lodash from 'lodash';
export const mapDataListTable = (data: any) => {
  let dataMain = [];
  let dataCache = lodash.cloneDeep(data);
  for (let index = 0; index < dataCache?.length; index++) {
    if (index % 2 == 0) {
      dataMain.push(dataCache?.splice(0, 3));
    } else {
      dataMain.push(dataCache?.splice(0, 2));
    }
  }
  return dataMain;
};
