import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {SHADOWTABLE, TABLE} from '../assets';
import {Fonts} from '../contants';
const Table = (props: any) => {
  const {codeTable, style, backgroundColor} = props;
  return (
    <View
      style={[
        style,
        styles.containerTable,
        {backgroundColor: backgroundColor},
      ]}>
      <Image resizeMode={'contain'} style={styles.image} source={SHADOWTABLE} />
      <Text style={styles.titleTable}>{codeTable}</Text>
      <Image style={styles.tableImage} source={TABLE} resizeMode={'cover'} />
    </View>
  );
};

const styles = StyleSheet.create({
  containerTable: {
    borderWidth: 2,
    borderColor: '#333333',
    width: wp('26'),
    alignItems: 'center',
    justifyContent: 'center',
    height: hp('9'),
    borderRadius: wp('2'),
    overflow: 'hidden',
  },
  image: {
    width: wp('16'),
    height: wp('10'),
    position: 'absolute',
    top: '38%',
    left: '33%',
  },
  tableImage: {
    width: wp('18'),
    height: hp('6'),
  },
  titleTable: {
    fontFamily: Fonts.Roboto_Stab_Bold,
    fontSize: wp('4'),
    color: '#000',
    marginBottom: hp('-1.5'),
  },
});
export default Table;
