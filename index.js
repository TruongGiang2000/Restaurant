/**
 * @format
 */
import React from 'react';
import {AppRegistry, View, StatusBar, LogBox} from 'react-native';
import App from './src/route/index';
import {name as appName} from './app.json';
const app = () => (
  <View style={{flex: 1}}>
    <StatusBar
      backgroundColor={'#ffffff'}
      barStyle={'dark-content'}
      animated={true}
    />
    <App />
  </View>
);

AppRegistry.registerComponent(appName, () => app);
LogBox.ignoreAllLogs(true);
