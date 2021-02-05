import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {Login, HomeRoute, SplashScreen} from '../screen';
import {ListDish} from '../screen/modules';
import {View, StatusBar} from 'react-native';
import {connect} from 'react-redux';
import {systems} from '../redux';
import {actionInit} from '../util';
import {IndicatorMain} from '../component';
import store from '../redux/store';
const Stack = createStackNavigator();
const mainRoute = () => {
  const {auth}: any = store?.getState();
  const token = auth?.token;
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode={'none'}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        {!token && <Stack.Screen name="Login" component={Login} />}
        <Stack.Screen name="Home" component={HomeRoute} />
        <Stack.Screen name="ListDish" component={ListDish} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const App = (props: any) => {
  const {loading} = props;
  useEffect(() => {
    actionInit(props);
  }, []);
  return (
    <View style={{flex: 1}}>
      {loading && <IndicatorMain />}
      <StatusBar
        backgroundColor={'#ffffff'}
        barStyle={'dark-content'}
        animated={true}
      />
      {mainRoute()}
    </View>
  );
};
const mapStateFromProps = (state: any) => {
  return {
    loading: state.systems.loading,
  };
};
export default connect(mapStateFromProps, {...systems})(App);
