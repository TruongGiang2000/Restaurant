import {types, systemAction} from './actions';
import {$axios} from '../../contants';
import {ofType} from 'redux-observable';
import {mergeMap} from 'rxjs/operators';
import {mapDataListTable} from '../../util/';
export const getAllTable = ($action: any) => {
  return $action.pipe(
    ofType(types.GET_LIST_TABLE),
    mergeMap(() => {
      return $axios.api
        .get('table/table/getAllTable')
        .then((rs: any) => {
          const {data} = rs;
          console.log('getAllTable', data?.data);
          return systemAction.getListTableSuccess(
            mapDataListTable(data?.data?.data),
          );
        })
        .catch((err: any) => {
          console.log('err', err);
          return systemAction.getListTableFail(err);
        });
    }),
  );
};
export const getAllArea = ($action: any) => {
  return $action.pipe(
    ofType(types.GET_LIST_AREA),
    mergeMap(() => {
      return $axios.api
        .get('table/area/')
        .then((rs: any) => {
          const {data} = rs;
          console.log('getAllArea', data?.data);
          return systemAction.getListAreaSuccess(data?.data);
        })
        .catch((err: any) => {
          console.log('err', err);
          return systemAction.getListAreaFail(err);
        });
    }),
  );
};
