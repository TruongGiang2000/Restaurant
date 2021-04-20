import {DataStatus} from '../contants/Data';
import store from '../redux/store';
import lodash from 'lodash';
import {useSelector} from 'react-redux';
export const getColorByStatus = (status: number) => {
  const index = DataStatus?.findIndex((it) => it.status == status);
  return DataStatus[index]?.color || '#fff';
};
export const getOrderByTable = (idTable: any) => {
  const orderTableAll = useSelector(
    (state: any) => state?.systems?.orderTableAll,
  );
  const indexFind = orderTableAll?.findIndex((it) => {
    const firstItemTable = lodash.get(it?.tables, '[0]', {});
    return firstItemTable?._id == idTable;
  });
  return indexFind != -1 ? orderTableAll[indexFind] : {};
};
export const getColorByStatusOrder = (item: any) => {
  if (item?.waitingQuantity > 0) {
    return '#F3E205';
  }
  if (item?.completedQuantity > 0) {
    return '#3E8A4F';
  } else {
    return '#ED1F24';
  }
};
export const getStatusTextOrder = (item: any) => {
  if (item?.waitingQuantity > 0) {
    return 'Đang đợi';
  }
  if (item?.completedQuantity > 0) {
    return 'Hoàn thành';
  } else {
    return 'Đã huỷ';
  }
};
