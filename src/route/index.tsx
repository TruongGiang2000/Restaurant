import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {Login, HomeRoute, SplashScreen} from '../screen';
import {ListDish} from '../screen/modules';
const Stack = createStackNavigator();
const mainRoute = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode={'none'}>
        <Stack.Screen name="SplashScreen" component={ListDish} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={HomeRoute} />
        <Stack.Screen name="ListDish" component={ListDish} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default mainRoute;
