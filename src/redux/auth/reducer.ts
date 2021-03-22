import {types} from './actions';

const initState = {
  token: '',
  messAuth: '',
  profileInfo: undefined,
};
export const authReducer: any = (state = initState, actions: any) => {
  const {payload} = actions;
  switch (actions.type) {
    case types.SIGN_IN:
      return {...state, token: ''};
    case types.SIGN_IN_FAIL:
      return {...state, token: '', messAuth: payload};
    case types.SIGN_IN_SUCCESS:
      return {...state, token: payload.data};
    case types.SET_PROFILE_INFO:
      return {...state, profileInfo: payload};
    default:
      return state;
  }
};
