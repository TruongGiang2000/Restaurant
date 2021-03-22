import {combineEpics} from 'redux-observable';
import {signIn} from './auth/epic';
import {getAllArea, getMenu} from './system/epic';
const rootEpics = combineEpics(signIn, getAllArea, getMenu);
export default rootEpics;
