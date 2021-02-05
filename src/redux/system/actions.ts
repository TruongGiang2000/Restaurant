export const types = {
  SET_LOADING: 'SET_LOADING',
  GET_LIST_TABLE: 'GET_LIST_TABLE',
  GET_LIST_TABLE_SUCCESS: 'GET_LIST_TABLE_SUCCESS',
  GET_LIST_TABLE_FAIL: 'GET_LIST_TABLE_FAIL',
  GET_LIST_AREA: 'GET_LIST_AREA',
  GET_LIST_AREA_SUCCESS: 'GET_LIST_AREA_SUCCESS',
  GET_LIST_AREA_FAIL: 'GET_LIST_AREA_FAIL',
};
const action = (type: string, payload?: any) => ({type, payload});
export const systemAction = {
  setLoading: (payload: any) => action(types.SET_LOADING, payload),
  getListTable: (payload: any) => action(types.GET_LIST_TABLE, payload),
  getListTableSuccess: (payload: any) =>
    action(types.GET_LIST_TABLE_SUCCESS, payload),
  getListTableFail: (payload: any) =>
    action(types.GET_LIST_TABLE_FAIL, payload),
  getListArea: (payload: any) => action(types.GET_LIST_AREA, payload),
  getListAreaSuccess: (payload: any) =>
    action(types.GET_LIST_AREA_SUCCESS, payload),
  getListAreaFail: (payload: any) => action(types.GET_LIST_AREA_FAIL, payload),
};
