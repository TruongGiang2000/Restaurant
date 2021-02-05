import React, {useRef} from 'react';
import {StyleSheet, Text} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Fonts, mainColors} from '../contants';
import Ripple from 'react-native-material-ripple';
import * as Annimatable from 'react-native-animatable';
export const ButtonCustom = (props: any) => {
  const {title, onPress, style, titleStyle} = props;
  const refAnimatable = useRef<any>();
  const _onPress = async () => {
    await refAnimatable.current.tada();
    onPress();
  };
  return (
    <Annimatable.View ref={refAnimatable}>
      <Ripple onPressIn={_onPress} style={[styles.MainContainer, style]}>
        <Text style={[styles.title, titleStyle]}>{title}</Text>
      </Ripple>
    </Annimatable.View>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    backgroundColor: '#3e8a4f',
    borderRadius: wp(2),
  },
  title: {
    fontFamily: Fonts.Roboto_Slab_Regular,
    color: mainColors.whiteColor,
    fontSize: wp('4'),
  },
});
