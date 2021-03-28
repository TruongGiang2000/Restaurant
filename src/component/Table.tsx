import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {SHADOWTABLE, TABLE} from '../assets';
import {Fonts} from '../contants';
import FastImage from 'react-native-fast-image';
import Ripple from 'react-native-material-ripple';
const Table = (props: any) => {
  const {codeTable, style, backgroundColor, onPress} = props;
  return (
    <Ripple
      onPress={onPress}
      style={[
        styles.containerTable,
        {backgroundColor: backgroundColor},
        style,
      ]}>
      <FastImage
        resizeMode={'contain'}
        style={styles.image}
        source={SHADOWTABLE}
      />
      <Text style={styles.titleTable}>{codeTable}</Text>
      <FastImage
        style={styles.tableImage}
        source={TABLE}
        resizeMode={'contain'}
      />
    </Ripple>
  );
};

const styles = StyleSheet.create({
  containerTable: {
    borderWidth: 2,
    borderColor: '#333333',
    width: wp('24'),
    alignItems: 'center',
    justifyContent: 'center',
    height: hp('7.5'),
    borderRadius: wp('2'),
    overflow: 'hidden',
    marginTop: hp(0.8),
  },
  image: {
    width: wp('15'),
    height: wp('15') * 0.63362069,
    position: 'absolute',
    top: '30%',
    left: '35%',
  },
  tableImage: {
    width: wp('15'),
    height: wp('15') * 0.769230769,
    marginBottom: hp(0.5),
  },
  titleTable: {
    fontFamily: Fonts.Roboto_Stab_Bold,
    fontSize: wp('3.5'),
    color: '#000',
    marginBottom: hp(-1.3),
  },
});
export default Table;
