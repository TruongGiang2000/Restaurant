import React, {useRef} from 'react';
import {StyleSheet, Text} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Fonts, mainColors} from '../contants';
import Ripple from 'react-native-material-ripple';
export const ButtonCustom = (props: any) => {
  const {title, onPress, style, titleStyle} = props;
  return (
    <Ripple onPressIn={onPress} style={[styles.MainContainer, style]}>
      <Text style={[styles.title, titleStyle]}>{title}</Text>
    </Ripple>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    backgroundColor: '#3e8a4f',
    borderRadius: wp(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: Fonts.Roboto_Slab_Regular,
    color: mainColors.whiteColor,
    fontSize: wp('4'),
  },
});
