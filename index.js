/**
 * @format
 */
import React from 'react';
import {AppRegistry, View, StatusBar, LogBox} from 'react-native';
import App from './src/route/index';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import configureStore from './src/redux/store';
const app = () => (
  <Provider store={configureStore}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => app);
LogBox.ignoreAllLogs(true);
