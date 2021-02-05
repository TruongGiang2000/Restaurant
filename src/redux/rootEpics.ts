import {combineEpics} from 'redux-observable';
import {signIn} from './auth/epic';
import {getAllTable, getAllArea} from './system/epic';
const rootEpics = combineEpics(signIn, getAllTable, getAllArea);
export default rootEpics;
