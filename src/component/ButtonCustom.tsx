import React from 'react';
import {View, StyleSheet, Text, Pressable, ColorPropType} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Fonts, mainColors} from '../contants';
export const ButtonCustom = (props: any) => {
  const {title, onPress, style, titleStyle} = props;
  return (
    <Pressable onPress={onPress} style={[styles.MainContainer, style]}>
      <Text style={[styles.title, titleStyle]}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    backgroundColor: mainColors.colorButton,
    borderWidth: 1,
    borderColor: mainColors.titleColor,
  },
  title: {
    fontFamily: Fonts.Roboto_Stab_Bold,
    color: mainColors.colorButtonText,
    fontSize: wp('4'),
  },
});
