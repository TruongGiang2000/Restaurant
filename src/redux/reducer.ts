import {combineReducers} from 'redux';
import {authReducer} from './auth/reducer';
import {systemsReducer} from './system/reducer';
export default combineReducers({auth: authReducer, systems: systemsReducer});
