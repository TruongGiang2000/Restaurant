import {types} from './actions';
import lodash, {forEach} from 'lodash';
import {types as typesAction} from '../auth/actions';
const initState = {
  loading: false,
  listArea: [],
  splashLoad: false,
  menu: [],
  orderFood: [],
  isConnectSocket: false,
  orderTableAll: [],
};
export const systemsReducer: any = (state = initState, actions: any) => {
  const {payload} = actions;
  switch (actions.type) {
    case types.SET_LOADING:
      return {...state, loading: payload.status};
    case types.GET_LIST_AREA:
      return {...state, listArea: []};
    case types.GET_LIST_AREA_SUCCESS:
      return {...state, listArea: payload?.data};
    case types.GET_LIST_AREA_FAIL:
      return {
        ...state,
        listArea: [],
      };
    case types.SET_SPLASH_LOAD:
      return {...state, splashLoad: payload};
    case types.GET_MENU:
      return {...state, menu: []};
    case types.GET_MENU_SUCCESS:
      return {...state, menu: payload?.data};
    case types.GET_MENU_FAIL:
      return {...state, menu: []};
    case types.SET_ORDER_FOOD:
      return {
        ...state,
        orderFood: state.orderFood ? state.orderFood.concat(payload) : payload,
      };
    case types.SET_CONNECT_SOCKET:
      return {
        ...state,
        isConnectSocket: payload,
      };
    case typesAction.CLEAR_AUTH:
      return {...state, listArea: []};
    case types.CLEAR_ORDER_FOOD: {
      return {...state, orderFood: []};
    }
    case types.GET_ALL_ORDER:
      return {
        ...state,
        orderTableAll: [],
      };
    case types.GET_ALL_ORDER_SUCCESS:
      return {...state, orderTableAll: payload};
    case types.GET_ALL_ORDER_FAIL:
      return {...state, orderTableAll: []};
    case types.UPDATE_ORDER_TABLE: {
      const firstItem = lodash.get(payload, '[0]', {});
      const table = lodash.get(firstItem?.tables, '[0]', {});
      const indexTable = state.orderTableAll.findIndex((it) => {
        const firstTable = lodash.get(it?.tables, '[0]', {});
        return firstTable._id == table?._id;
      });
      const orderTableAllClone = lodash.cloneDeep(state?.orderTableAll);
      console.log('orderTableAllClone', orderTableAllClone);
      if (indexTable == -1) {
        orderTableAllClone.concat(firstItem);
        return {
          ...state,
          orderTableAll: orderTableAllClone,
        };
      }
      const tableIndex = orderTableAllClone[indexTable];
      let indexFinish = 0;
      lodash.forEach(tableIndex?.orderFoods, (itParent) => {
        indexFinish += 1;
        const findIndexChild = firstItem?.orderFoods?.findIndex(
          (itChild) => itParent?.foodItem?._id == itChild?.foodItem?._id,
        );
        console.log(
          'tableIndex?.orderFoods',
          tableIndex?.orderFoods,
          firstItem?.orderFoods,
        );
        if (findIndexChild != -1) {
          tableIndex?.orderFoods?.splice(
            findIndexChild,
            1,
            ...firstItem?.orderFoods,
          );
        }
      });
      console.log('indexFinish', indexFinish, tableIndex?.orderFoods);
      if (indexFinish != tableIndex.orderFoods?.length) return;
      return {
        ...state,
        orderTableAll: orderTableAllClone,
      };
    }
    case types.UPDATE_ORDER_FOOD:
      return {...state, orderFood: payload};

    default:
      return state;
  }
};
