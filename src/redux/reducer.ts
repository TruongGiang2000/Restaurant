import {combineReducers} from 'redux';
import {authReducer} from './auth/reducer';
import {systemsReducer} from './system/reducer';
import {modalReducer} from './modal/reducer';
export default combineReducers({
  auth: authReducer,
  systems: systemsReducer,
  modal: modalReducer,
});
