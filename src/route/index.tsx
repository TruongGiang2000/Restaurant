import React, {useEffect, useRef} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {Login, HomeRoute, SplashScreen, MyTabs} from '../screen';
import {ListDish} from '../screen/modules';
import {View, StatusBar, StyleSheet} from 'react-native';
import {connect, useSelector} from 'react-redux';
import {systems, modal} from '../redux';
import {actionInit} from '../util';
import {IndicatorMain, ModalWarning} from '../component';
import lodash from 'lodash';
import {ListOrder} from '../screen/menu/modules';
import {TouchableOpacity} from 'react-native-gesture-handler';
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
            <Stack.Screen name="ListOrder" component={ListOrder} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const App = (props: any) => {
  const {loading, modal, isConnectSocket} = props;
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
      <TouchableOpacity style={styles.btnLogout}></TouchableOpacity>
      {mainRoute()}
      <View
        style={[
          styles.signalSocket,
          {backgroundColor: isConnectSocket ? 'green' : 'red'},
        ]}
      />
    </View>
  );
};
export const styles = StyleSheet.create({
  signalSocket: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  btnLogout: {
    width: 50,
    height: 50,
    backgroundColor: 'red',
    position: 'absolute',
    left: 0,
    bottom: 0,
    zIndex: 99,
  },
});
const mapStateFromProps = (state: any) => {
  return {
    loading: state.systems.loading,
    modal: state.modal.modal,
    isConnectSocket: state.systems.isConnectSocket,
  };
};
export default connect(mapStateFromProps, {...systems, ...modal})(App);
