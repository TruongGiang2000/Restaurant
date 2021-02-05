import React from 'react';
import {StyleSheet, View, ImageBackground} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {BACKGROUNDSMALL} from '../assets';
const BackgroundSmall = (props: any) => {
  const {children, style} = props;
  return (
    <ImageBackground
      source={BACKGROUNDSMALL}
      style={[styles.MainContainer, style]}>
      <View style={{flex: 1}}>{children}</View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  MainContainer: {
    height: hp('100'),
    zIndex: -99,
  },
});
export default BackgroundSmall;
