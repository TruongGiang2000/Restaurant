import {DataStatus} from '../contants/Data';
import store from '../redux/store';
import {useSelector} from 'react-redux';
export const getColorByStatus = (status: number) => {
  const index = DataStatus?.findIndex((it) => it.status == status);
  return DataStatus[index]?.color || '#fff';
};
export const getOrderByTable = (idTable: any) => {
  const orderTableAll = useSelector(
    (state: any) => state?.systems?.orderTableAll,
  );
  console.log('orderTableAll', orderTableAll);
  const indexFind = orderTableAll?.findIndex((it) => it?._id == idTable);
  return indexFind != -1 ? orderTableAll[indexFind] : {};
};
