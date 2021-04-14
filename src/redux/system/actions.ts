export const types = {
  SET_LOADING: 'SET_LOADING',
  GET_LIST_AREA: 'GET_LIST_AREA',
  GET_LIST_AREA_SUCCESS: 'GET_LIST_AREA_SUCCESS',
  GET_LIST_AREA_FAIL: 'GET_LIST_AREA_FAIL',
  SET_SPLASH_LOAD: 'SET_SPLASH_LOAD',
  GET_MENU: 'GET_MENU',
  GET_MENU_SUCCESS: 'GET_MENU_SUCCESS',
  GET_MENU_FAIL: 'GET_MENU_FAIL',
  SET_ORDER_FOOD: 'SET_ORDER_FOOD',
  SET_CONNECT_SOCKET: 'SET_CONNECT_SOCKET',
  CLEAR_ORDER_FOOD: 'CLEAR_ORDER_FOOD',
  GET_ALL_ORDER: 'GET_ALL_ORDER',
  GET_ALL_ORDER_SUCCESS: 'GET_ALL_ORDER_SUCCESS',
  GET_ALL_ORDER_FAIL: 'GET_ALL_ORDER_FAIL',
  UPDATE_ORDER_TABLE: 'UPDATE_ORDER_TABLE',
};
const action = (type: string, payload?: any) => ({type, payload});
export const systemAction = {
  setLoading: (payload: any) => action(types.SET_LOADING, payload),
  getListArea: (payload: any) => action(types.GET_LIST_AREA, payload),
  getListAreaSuccess: (payload: any) =>
    action(types.GET_LIST_AREA_SUCCESS, payload),
  getListAreaFail: (payload: any) => action(types.GET_LIST_AREA_FAIL, payload),
  setSplashLoad: (payload: any) => action(types.SET_SPLASH_LOAD, payload),
  getMenu: (payload: any) => action(types.GET_MENU, payload),
  getMenuSuccess: (payload: any) => action(types.GET_MENU_SUCCESS, payload),
  getMenuFail: (payload: any) => action(types.GET_MENU_FAIL, payload),
  setOrderFood: (payload: any) => action(types.SET_ORDER_FOOD, payload),
  setConnectSocket: (payload: any) => action(types.SET_CONNECT_SOCKET, payload),
  clearOrderFood: () => action(types.CLEAR_ORDER_FOOD),
  getAllOrder: () => action(types.GET_ALL_ORDER),
  getALlOrderSuccess: (payload: any) =>
    action(types.GET_ALL_ORDER_SUCCESS, payload),
  getAllOrderFail: (payload: any) => action(types.GET_ALL_ORDER_FAIL, payload),
  updateOrderTable: (payload: any) => action(types.UPDATE_ORDER_TABLE, payload),
};
