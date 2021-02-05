import {types} from './actions';

const initState = {
  token: '',
};
export const authReducer: any = (state = initState, actions: any) => {
  const {payload} = actions;
  switch (actions.type) {
    case types.SIGN_IN:
      return {...state, token: ''};
    case types.SIGN_IN_FAIL:
      return {...state, token: ''};
    case types.SIGN_IN_SUCCESS:
      return {...state, token: payload.data};
    default:
      return state;
  }
};
