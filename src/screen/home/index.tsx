/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Order from './Order';
const HomeStack = {
  Order: {
    screen: Order,
    path: 'Order',
  },
};

const Stack = createStackNavigator();
export const HomeRoute = () => {
  return (
    <Stack.Navigator initialRouteName="Order" headerMode={'none'}>
      {Object.keys(HomeStack).map((key) => {
        return (
          <Stack.Screen
            key={key}
            name={key}
            component={HomeStack[key].screen}
            options={{
              ...HomeStack[key].navigationOptions,
            }}
          />
        );
      })}
    </Stack.Navigator>
  );
};
