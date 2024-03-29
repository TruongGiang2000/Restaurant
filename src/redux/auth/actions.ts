export const types = {
  SIGN_IN: 'SIGN_IN',
  SIGN_IN_SUCCESS: 'SIGN_IN_SUCCESS',
  SIGN_IN_FAIL: 'SIGN_IN_FAIL',
  SET_PROFILE_INFO: 'SET_PROFILE_INFO',
  CLEAR_AUTH: 'CLEAR_AUTH',
};
const action = (type: string, payload?: any) => ({type, payload});
export const authAction = {
  signIn: (payload: any) => action(types.SIGN_IN, payload),
  signInSuccess: (payload: any) => action(types.SIGN_IN_SUCCESS, payload),
  signInFail: (payload: any) => action(types.SIGN_IN_FAIL, payload),
  setProfileInfo: (payload: any) => action(types.SET_PROFILE_INFO, payload),
  clearAuth: (payload: any) => action(types.CLEAR_AUTH, payload),
};
