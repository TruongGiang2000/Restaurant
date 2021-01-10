import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {mainColors, Fonts} from '../contants';
const TextInputCustom = (props: any) => {
  const {style, inputStyle, placeHolder, txtError} = props;
  const [hidePlaHol, setHidePlaHol] = useState(true);
  const [value, setValue] = useState('');
  const onChangeText = (value: any) => {
    setValue(value);
    props.onChangeText(value);
  };
  useEffect(() => {
    if (value) {
      return setHidePlaHol(false);
    }
    setHidePlaHol(true);
  }, [value]);
  return (
    <View style={style}>
      <View style={styles.containerInput}>
        {hidePlaHol && <Text style={styles.placeHolder}>{placeHolder}</Text>}
        <TextInput
          {...props}
          style={[styles.input, inputStyle]}
          onChangeText={onChangeText}
          defaultValue={value}
        />
      </View>
      <Text style={styles.txtError}>{txtError}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  containerInput: {
    width: wp('80'),
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: mainColors.titleColor,
    borderWidth: 1.3,
    borderRadius: wp('1'),
    opacity: 0.7,
  },
  placeHolder: {
    fontFamily: Fonts.Roboto_Slab_Regular,
    fontWeight: '400',
    color: mainColors.titleColor,
    fontSize: wp('3.5'),
    position: 'absolute',
  },
  input: {
    height: hp('6'),
    width: '100%',
    textAlign: 'center',
    fontFamily: Fonts.Roboto_Slab_Regular,
    fontWeight: '400',
    color: mainColors.titleColor,
    fontSize: wp('3.5'),
  },
  txtError: {
    fontFamily: Fonts.Roboto_Slab_Regular,
    color: mainColors.activeColor,
    fontSize: wp('3.4'),
    marginTop: wp('1'),
  },
});
export default TextInputCustom;
