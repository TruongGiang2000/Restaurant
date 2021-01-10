import React from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Fonts} from '../../contants';
import {ButtonCustom} from './../../component';
import {DummyListDish, mainColors} from '../../contants';
export const ListDish = (props: any) => {
  const {style} = props;
  const renderItem = ({item}) => {
    const isComplete = item.status == 'Hoàn thành';
    console.log('it', item);
    return (
      <View style={styles.viewRowHeader}>
        <Text style={styles.mealStyle}>{item?.meal}</Text>
        {isComplete ? (
          <Text style={styles.completeStyle}>{item?.sllComplete}</Text>
        ) : (
          <RenderTextRow data={item} />
        )}
        <Text style={styles.priceStyle}>{item?.price}</Text>
        <Text style={styles.priceStyle}>Status</Text>
      </View>
    );
  };
  return (
    <View style={[styles.MainContainer, style]}>
      <View style={styles.viewRowHeader}>
        <Text style={[styles.titleHeader, {textAlign: 'left'}]}>Món</Text>
        <Text style={styles.titleHeader}>Số lượng</Text>
        <Text style={styles.titleHeader}>Giá</Text>
        <Text style={styles.titleHeader}>Trạng thái</Text>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={DummyListDish}
        renderItem={renderItem}
      />
      <ButtonCustom
        title={'Thanh toán'}
        style={styles.styleButton}
        titleStyle={styles.titleButtonStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    borderWidth: 2,
    borderColor: '#333333',
    borderRadius: wp('2'),
    height: hp('60'),
    width: wp('90'),
    alignSelf: 'center',
    marginVertical: hp('5'),
    justifyContent: 'flex-end',
  },
  styleButton: {
    alignItems: 'center',
    paddingVertical: hp('1'),
  },
  titleButtonStyle: {
    fontSize: wp('4.5'),
  },
  viewRowHeader: {
    flexDirection: 'row',
    paddingHorizontal: wp('2'),
    paddingVertical: hp('1'),
  },
  titleHeader: {
    fontFamily: Fonts.Roboto_Stab_Bold,
    fontSize: wp('4'),
    flex: 1,
    textAlign: 'center',
  },
  completeStyle: {
    color: mainColors.colorCompleteText,
    fontFamily: Fonts.Roboto_Slab_Regular,
    fontSize: wp('2.3'),
    textAlign: 'center',
    flex: 1,
  },
  watingStyle: {
    color: mainColors.colorWaitingText,
    fontFamily: Fonts.Roboto_Slab_Regular,
  },
  cancelStyle: {
    color: mainColors.colorCancelText,
    fontFamily: Fonts.Roboto_Slab_Regular,
  },
  mealStyle: {
    fontFamily: Fonts.Roboto_Slab_Regular,
    color: mainColors.titleColor,
    fontSize: wp('2.3'),
    flex: 1,
  },
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  priceStyle: {
    fontFamily: Fonts.Roboto_Slab_Regular,
    color: mainColors.titleColor,
    fontSize: wp('2.3'),
    flex: 1,
    textAlign: 'center',
  },
  sllStyle: {
    fontFamily: Fonts.Roboto_Slab_Regular,
    color: mainColors.titleColor,
    fontSize: wp('2.3'),
  },
});
const RenderTextRow = (props: any) => {
  const {data} = props;
  return (
    <View style={styles.viewRow}>
      <Text style={styles.sllStyle}>3</Text>
      <Text style={styles.sllStyle}>2</Text>
      <Text style={styles.sllStyle}>3</Text>
    </View>
  );
};
