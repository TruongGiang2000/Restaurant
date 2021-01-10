import React, {useState, useRef} from 'react';
import {View, StyleSheet, Text, FlatList, Animated} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Unit from '../../component/Unit';
import BackgroundSmall from '../../component/BackgroundSmall';
import {mainColors, Fonts} from '../../contants';
const Order = (props: any) => {
  const [active, setActive] = useState({});
  const data = [
    {code: '01'},
    {code: '02'},
    {code: '03'},
    {code: '04'},
    {code: '05'},
    {code: '06'},
    {code: '07'},
  ];
  const onPress = (item: any) => () => {
    if (Object.values(active).some((it) => it === item.code)) {
      const filterItem = Object.values(active).filter((it) => it != item.code);
      return setActive(filterItem);
    }
    setActive({...active, [item.code]: item.code});
  };
  const renderItem = ({item, index}) => {
    let showTable = Object.values(active).some((it) => it === item.code);
    return (
      <Unit
        unit={'Lầu'}
        codeUnit={item.code}
        onPress={onPress(item)}
        active={showTable}
        style={index == 0 ? undefined : {marginTop: hp('3')}}
        showTable={showTable}
      />
    );
  };
  return (
    <BackgroundSmall isScroll={false} style={styles.MainContainer}>
      <FlatList
        data={data}
        renderItem={renderItem}
        contentContainerStyle={{marginHorizontal: wp('2')}}
      />
      <View style={styles.row}>
        <View>
          <View style={styles.row}>
            <View
              style={[styles.noteFood, {backgroundColor: mainColors.waitFood}]}
            />
            <Text style={styles.txtNote}>Đang đợi món</Text>
          </View>
          <View style={[styles.row, {marginTop: hp('1')}]}>
            <View
              style={[
                styles.noteFood,
                {backgroundColor: mainColors.completeColor},
              ]}
            />
            <Text style={styles.txtNote}>Đã đủ món</Text>
          </View>
        </View>
        <View>
          <View style={styles.row}>
            <View
              style={[
                styles.noteFood,
                {backgroundColor: mainColors.whiteColor, marginLeft: wp('2')},
              ]}
            />
            <Text style={styles.txtNote}>Có người ngồi</Text>
          </View>
          <View style={[styles.row, {marginTop: hp('1')}]}>
            <View
              style={[
                styles.noteFood,
                {
                  backgroundColor: mainColors.disableColor,
                  marginLeft: wp('2'),
                },
              ]}
            />
            <Text style={styles.txtNote}>Không có người ngồi</Text>
          </View>
        </View>
      </View>
    </BackgroundSmall>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'flex-end',
    flex: 1,
    paddingTop: hp('2'),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: wp('2'),
    marginVertical: hp('1'),
  },
  noteFood: {
    width: wp('7'),
    height: hp('2.5'),
    borderRadius: wp('1'),
    borderWidth: 2,
    borderColor: '#333333',
  },
  txtNote: {
    fontFamily: Fonts.Roboto_Slab_Regular,
    color: mainColors.blackColor,
    fontSize: wp('3'),
    marginLeft: wp('1'),
  },
});
export default Order;
