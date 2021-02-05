import {types} from './actions';

const initState = {
  loading: false,
  listTable: [],
  listArea: [],
};
export const systemsReducer: any = (state = initState, actions: any) => {
  const {payload} = actions;
  switch (actions.type) {
    case types.SET_LOADING:
      return {...state, loading: payload.status};
    case types.GET_LIST_TABLE:
      return {...state, listTable: []};
    case types.GET_LIST_TABLE_SUCCESS:
      return {...state, listTable: payload};
    case types.GET_LIST_TABLE_FAIL:
      return {
        ...state,
        listTable: [],
      };
    case types.GET_LIST_AREA:
      return {...state, listArea: []};
    case types.GET_LIST_AREA_SUCCESS:
      return {...state, listArea: payload?.data};
    case types.GET_LIST_AREA_FAIL:
      return {
        ...state,
        listArea: [],
      };
    default:
      return state;
  }
};
