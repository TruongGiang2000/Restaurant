import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Login from '../screen/login';
const Stack = createStackNavigator();
const mainRoute = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode={'none'}>
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default mainRoute;
