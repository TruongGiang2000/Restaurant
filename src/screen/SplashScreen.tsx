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
import {ICONMAIN} from '../assets';
import {BackgroundBig} from '../component';
import lodash from 'lodash';
const SplashScreen = (props: any) => {
  const [syncMessage, setSyncMessage] = useState('');
  const [codePushSuccess, setCodePushSuccess] = useState(false);
  const {getListArea, profileInfo, setSplashLoad, listArea, getMenu} = props;
  const loadingApp = () => {
    setCodePushSuccess(true);
  };
  useEffect(() => {
    CodePush.sync(
      {
        installMode: CodePush.InstallMode.IMMEDIATE,
      },
      codePushStatusDidChange,
    );
  }, []);
  const codePushStatusDidChange = (syncStatus: any) => {
    console.log('syncStatus', syncStatus);
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
        setSyncMessage('ɚ 0.7');
        loadingApp();
        break;
    }
  };
  useEffect(() => {
    if (profileInfo) {
      const data = {site: profileInfo?.siteId, store: profileInfo?.storeId};
      getListArea(data);
      getMenu(data);
    }
  }, [profileInfo]);
  const isSetSplashLoad = profileInfo ? !lodash.isEmpty(listArea) : true;
  useEffect(() => {
    if (codePushSuccess && isSetSplashLoad) {
      setSplashLoad(true);
    }
  }, [codePushSuccess, listArea]);
  return (
    <BackgroundBig>
      <View style={styles.container}>
        <Image source={ICONMAIN} resizeMode={'contain'} style={styles.image} />
        <View style={{height: hp('5')}}>
          <SkypeIndicator color={mainColors.mainColor} size={wp('10')} />
        </View>
        <Text style={styles.syncMess}>{syncMessage}</Text>
      </View>
    </BackgroundBig>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: wp('40'),
    height: wp('40'),
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
    listArea: state.systems.listArea,
    profileInfo: state.auth.profileInfo,
  };
};
export default connect(mapStateFromProps, systems)(SplashScreen);
