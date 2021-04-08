import {types, authAction} from './actions';
import {$axios} from '../../contants';
import {ofType} from 'redux-observable';
import {mergeMap, catchError} from 'rxjs/operators';
import {actionMain} from '../../util/mainActions';
import jwt_decode from 'jwt-decode';
import {from} from 'rxjs';
export const signIn = (action$: any) => {
  return action$.pipe(
    ofType(types.SIGN_IN),
    mergeMap((act: any) => {
      return from($axios.api.post('authentication/signin', act?.payload)).pipe(
        mergeMap((rs: any) => {
          const {data} = rs;
          const decoded = jwt_decode(data?.data);
          console.log('datea', data);
          return [
            authAction.signInSuccess(data),
            authAction.setProfileInfo(decoded),
          ];
        }),
        catchError((error) => {
          if (
            error?.response?.data?.message ==
            'Your account or password is wrong'
          ) {
            actionMain.showModal({
              status: true,
              title: 'Thông báo',
              content:
                'Tài khoản hoặc mật khẩu không chính xác, vui lòng thử lại.',
            });
          }
          return [authAction.signInFail(error?.response?.data?.message)];
        }),
      );
    }),
  );
};
