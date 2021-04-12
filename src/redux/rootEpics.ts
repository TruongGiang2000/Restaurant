import {combineEpics} from 'redux-observable';
import {signIn} from './auth/epic';
import {getAllArea, getAllOrder, getMenu} from './system/epic';
const rootEpics = combineEpics(signIn, getAllArea, getMenu, getAllOrder);
export default rootEpics;
