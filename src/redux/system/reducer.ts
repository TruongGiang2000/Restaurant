import {types} from './actions';

const initState = {
  loading: false,
  listArea: [],
  splashLoad: false,
  menu: [],
  orderFood: [],
  isConnectSocket: false,
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
    default:
      return state;
  }
};
