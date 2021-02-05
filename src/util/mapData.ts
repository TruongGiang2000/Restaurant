export const mapDataListTable = (data: any) => {
  let dataMain = [];
  for (let index = 0; index < data?.length; index++) {
    if (index % 2 == 0) {
      dataMain.push(data?.splice(0, 3));
    } else {
      dataMain.push(data?.splice(0, 2));
    }
  }
  return dataMain;
};
