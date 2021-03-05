import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import CodePush from 'react-native-code-push';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {SkypeIndicator} from 'react-native-indicators';
import {mainColors} from '../contants/Colors';
import {Fonts} from '../contants';
import {connect} from 'react-redux';
import {systems} from '../redux';
import lodash from 'lodash';
import {LOGO} from '../assets';
const SplashScreen = (props: any) => {
  const [syncMessage, setSyncMessage] = useState('');
  const [codePushSuccess, setCodePushSuccess] = useState(false);
  const {
    token,
    navigation,
    getListTable,
    getListArea,
    listTable,
    listArea,
  } = props;
  const loadingApp = () => {
    setCodePushSuccess(true);
  };
  useEffect(() => {
    getListTable();
    getListArea();
    CodePush.sync(
      {
        installMode: CodePush.InstallMode.IMMEDIATE,
      },
      codePushStatusDidChange,
    );
  }, []);
  const codePushStatusDidChange = (syncStatus: any) => {
    switch (syncStatus) {
      case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
        setSyncMessage('');
        break;
      case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
        setSyncMessage('downloading package');
        break;
      case CodePush.SyncStatus.AWAITING_USER_ACTION:
        setSyncMessage('awaiting user action');
        break;
      case CodePush.SyncStatus.INSTALLING_UPDATE:
        setSyncMessage('installing update');
        break;
      case CodePush.SyncStatus.UPDATE_IGNORED:
        setSyncMessage('update cancelled by user');
        loadingApp();
        break;
      case CodePush.SyncStatus.UPDATE_INSTALLED:
        setSyncMessage('update installed and will be applied on restart');
        setTimeout(() => {
          CodePush.restartApp();
        }, 1000);
        break;
      case CodePush.SyncStatus.UNKNOWN_ERROR:
        setSyncMessage('an unknown error occurred');
        loadingApp();
        break;
      case CodePush.SyncStatus.UP_TO_DATE:
      default:
        setSyncMessage('ɚ 0.4');
        loadingApp();
        break;
    }
  };
  useEffect(() => {
    if (
      codePushSuccess &&
      !lodash.isEmpty(listArea) &&
      !lodash.isEmpty(listTable)
    ) {
      setTimeout(() => {
        if (token) {
          return navigation.navigate('Home');
        }
        props.navigation.navigate('Login');
      }, 3000);
    }
  }, [codePushSuccess, listTable, listArea]);
  return (
    <View style={styles.container}>
      <Image source={LOGO} resizeMode={'contain'} style={styles.image} />
      <View style={{height: hp('5')}}>
        <SkypeIndicator color={mainColors.mainColor} size={wp('10')} />
      </View>
      <Text style={styles.syncMess}>{syncMessage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: wp('30'),
    height: hp('20'),
  },
  indicator: {
    height: wp('10'),
    backgroundColor: 'pink',
  },
  syncMess: {
    bottom: 5,
    right: 5,
    position: 'absolute',
    color: mainColors.blackColor,
    fontFamily: Fonts.Roboto_Slab_Regular,
  },
});
const mapStateFromProps = (state: any) => {
  return {
    token: state.auth.token,
    listTable: state.systems.listTable,
    listArea: state.systems.listArea,
  };
};
export default connect(mapStateFromProps, systems)(SplashScreen);
