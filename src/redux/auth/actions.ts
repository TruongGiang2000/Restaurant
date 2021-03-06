export const types = {
  SIGN_IN: 'SIGN_IN',
  SIGN_IN_SUCCESS: 'SIGN_IN_SUCCESS',
  SIGN_IN_FAIL: 'SIGN_IN_FAIL',
};
const action = (type: string, payload?: any) => ({type, payload});
export const authAction = {
  signIn: (payload: any) => action(types.SIGN_IN, payload),
  signInSuccess: (payload: any) => action(types.SIGN_IN_SUCCESS, payload),
  signInFail: (payload: any) => action(types.SIGN_IN_FAIL, payload),
};
