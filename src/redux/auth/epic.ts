import {types, authAction} from './actions';
import {$axios} from '../../contants';
import {ofType} from 'redux-observable';
import {mergeMap} from 'rxjs/operators';
import {actionMain} from '../../util/mainActions';
export const signIn = ($action: any) => {
  return $action.pipe(
    ofType(types.SIGN_IN),
    mergeMap((act: any) => {
      return $axios.api
        .post('authentication/signin', act?.payload)
        .then((rs: any) => {
          const {data} = rs;
          console.log('signIn', data);
          return authAction.signInSuccess(data);
        })
        .catch((err: any) => {
          console.log('err', err);
          return authAction.signInFail(err);
        })
        .finally(() => actionMain.loading(false));
    }),
  );
};
