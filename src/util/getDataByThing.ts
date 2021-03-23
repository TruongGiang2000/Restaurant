import {DataStatus} from '../contants/Data';
import lodash from 'lodash';
export const getColorByStatus = (status: number) => {
  const index = DataStatus?.findIndex((it) => it.status == status);
  return DataStatus[index]?.color || '#fff';
};
