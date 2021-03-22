import {types, authAction} from './actions';
import {$axios} from '../../contants';
import {ofType} from 'redux-observable';
import {mergeMap} from 'rxjs/operators';
import {actionMain} from '../../util/mainActions';
import jwt_decode from 'jwt-decode';
export const signIn = ($action: any) => {
  return $action.pipe(
    ofType(types.SIGN_IN),
    mergeMap((act: any) => {
      return $axios.api
        .post('authentication/signin', act?.payload)
        .then((rs: any) => {
          const {data} = rs;
          const decoded = jwt_decode(data?.data);
          return {
            ...authAction.signInSuccess(data),
            ...authAction.setProfileInfo(decoded),
          };
        })
        .catch((err: any) => {
          if (
            err?.response?.data?.message == 'Your account or password is wrong'
          ) {
            actionMain.showModal({
              status: true,
              title: 'Thông báo',
              content:
                'Tài khoản hoặc mật khẩu không chính xác, vui lòng thử lại.',
            });
          }

          return authAction.signInFail(err?.response?.data?.message);
        });
    }),
  );
};
