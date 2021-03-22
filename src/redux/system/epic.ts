import {types, systemAction} from './actions';
import {$axios} from '../../contants';
import {ofType} from 'redux-observable';
import {mergeMap} from 'rxjs/operators';
import {actionMain} from '../../util';
export const getAllArea = ($action: any) => {
  return $action.pipe(
    ofType(types.GET_LIST_AREA),
    mergeMap((act: any) => {
      return $axios.api
        .get(
          `table/arrangementTable/getManyArrangementTable?page=${1}&limit=${99}`,
          act?.payload,
        )
        .then((rs: any) => {
          const {data} = rs;
          return systemAction.getListAreaSuccess(data?.data);
        })
        .catch((err: any) => {
          console.log('err', err?.response);
          return systemAction.getListAreaFail(err);
        })
        .finally(() => actionMain.loading(false));
    }),
  );
};
export const getMenu = ($action: any) => {
  return $action.pipe(
    ofType(types.GET_MENU),
    mergeMap((act: any) => {
      return $axios.api
        .get(`food/menu/getAllMenus?page=${1}&limit=${99}`, act?.payload)
        .then((rs: any) => {
          const {data} = rs;
          return systemAction.getMenuSuccess(data?.data);
        })
        .catch((err: any) => {
          console.log('err', err?.response);
          return systemAction.getMenuFail(err?.response);
        });
    }),
  );
};
//
