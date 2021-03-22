import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {Login, HomeRoute, SplashScreen, MyTabs} from '../screen';
import {ListDish} from '../screen/modules';
import {View, StatusBar} from 'react-native';
import {connect, useSelector} from 'react-redux';
import {systems, modal} from '../redux';
import {actionInit} from '../util';
import {IndicatorMain, ModalWarning} from '../component';
import store from '../redux/store';
import lodash from 'lodash';
const Stack = createStackNavigator();
const mainRoute = () => {
  const {splashLoad, listArea} = useSelector((state) => ({
    splashLoad: state?.systems?.splashLoad,
    listArea: state?.systems?.listArea,
  }));
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode={'none'}>
        {!splashLoad && (
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
        )}
        {lodash.isEmpty(listArea) ? (
          <Stack.Screen name="Login" component={Login} />
        ) : (
          <>
            <Stack.Screen name="Home" component={HomeRoute} />
            <Stack.Screen name="ListDish" component={ListDish} />
            <Stack.Screen name="MyTabs" component={MyTabs} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const App = (props: any) => {
  const {loading, modal} = props;
  useEffect(() => {
    actionInit(props);
  }, []);
  const onRequestClose = () => props.setVisibleModal({status: false});
  return (
    <View style={{flex: 1}}>
      {loading && <IndicatorMain />}
      {modal?.status && (
        <ModalWarning
          title={modal?.title}
          content={modal?.content}
          onPressClose={onRequestClose}
          actionRight={onRequestClose}
        />
      )}
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
    modal: state.modal.modal,
  };
};
export default connect(mapStateFromProps, {...systems, ...modal})(App);
