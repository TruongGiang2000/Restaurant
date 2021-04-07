import {createStore, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import {createEpicMiddleware} from 'redux-observable';
import rootReducers from './reducer';
import rootEpic from './rootEpics';
import {createWhitelistFilter} from 'redux-persist-transform-filter';
const profileInfo = createWhitelistFilter('auth', ['profileInfo', 'token']);
const epicMiddleware = createEpicMiddleware();
const persistConfig: any = {
  key: 'root',
  transforms: [profileInfo],
  storage: AsyncStorage,
  timeout: 0,
  blacklist: ['systems'],
};
const persistedReducer = persistReducer(persistConfig, rootReducers);
const configureStore = createStore(
  persistedReducer,
  applyMiddleware(epicMiddleware),
);
epicMiddleware.run(rootEpic);
export const persistor = persistStore(configureStore);
export default configureStore;
configureStore.subscribe(() => {
  console.log('configureStore', configureStore.getState());
});
