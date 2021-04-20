import React from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Fonts} from '../../contants';
import {ButtonCustom} from './../../component';
import {mainColors} from '../../contants';
import {ScrollView} from 'react-native-gesture-handler';
import lodash from 'lodash';
import {getColorByStatusOrder, getStatusTextOrder} from '../../util';
export const ListDish = (props: any) => {
  const {style, navigation, activeTable, listOrderDish} = props;

  const renderItem = ({item}) => {
    const isComplete =
      item.waitingQuantity == 0 && item?.completedQuantity != 0;
    return (
      <View style={styles.viewRowHeader}>
        <Text style={styles.mealStyle}>{item?.foodItem?.foodName}</Text>
        {isComplete ? (
          <Text style={styles.completeStyle}>{item?.completedQuantity}</Text>
        ) : (
          <RenderTextRow data={item} />
        )}
        <Text style={styles.priceStyle}>{item?.typePrice?.valuePrice}</Text>
        <Text
          style={[
            styles.statusStyle,
            {backgroundColor: getColorByStatusOrder(item)},
          ]}
          numberOfLines={2}>
          {getStatusTextOrder(item)}
        </Text>
      </View>
    );
  };

  const navigateMenu = () => navigation.navigate('MyTabs', {activeTable});

  const emptyOrder = lodash.isEmpty(listOrderDish);
  return (
    <View style={[styles.MainContainer, style]}>
      {emptyOrder ? (
        <Text style={styles.noFoodTxt}>Bàn này chưa có món</Text>
      ) : (
        <>
          <View style={styles.viewRowHeader}>
            <Text style={[styles.titleHeader, {textAlign: 'left'}]}>Món</Text>
            <Text style={styles.titleHeader}>Số lượng</Text>
            <Text style={styles.titleHeader}>Giá</Text>
            <Text style={styles.titleHeader}>Trạng thái</Text>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <FlatList
              data={listOrderDish?.orderFoods}
              renderItem={renderItem}
              scrollEnabled={false}
              keyExtractor={(item, index) => `${item}${index}`}
              listKey={'ListDishUniKey'}
            />
          </ScrollView>
        </>
      )}
      {!emptyOrder && (
        <ButtonCustom
          title={'Menu'}
          style={styles.menuButton}
          titleStyle={{fontSize: wp(4)}}
          onPress={navigateMenu}
        />
      )}
      <ButtonCustom
        title={emptyOrder ? 'Đặt món' : 'Thanh toán'}
        style={styles.styleButton}
        titleStyle={styles.titleButtonStyle}
        onPress={emptyOrder ? navigateMenu : undefined}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    borderWidth: 2,
    borderColor: '#333333',
    borderRadius: wp('2'),
    height: hp('50'),
    width: wp('90'),
    alignSelf: 'center',
    marginVertical: hp('2'),
    justifyContent: 'flex-end',
    overflow: 'hidden',
    backgroundColor: mainColors.whiteColor,
  },
  styleButton: {
    alignItems: 'center',
    paddingVertical: hp('0.6'),
    borderRadius: 0,
  },
  titleButtonStyle: {
    fontSize: wp('4.5'),
  },
  viewRowHeader: {
    flexDirection: 'row',
    paddingHorizontal: wp('2'),
    paddingVertical: hp('1'),
    alignItems: 'center',
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
    fontSize: wp(3.8),
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
    fontSize: wp(3.4),
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
    fontSize: wp(3.4),
    flex: 1,
    textAlign: 'center',
  },
  sllStyle: {
    fontFamily: Fonts.Roboto_Slab_Regular,
    color: mainColors.titleColor,
    fontSize: wp(3.4),
  },
  statusStyle: {
    fontFamily: Fonts.Roboto_Slab_Regular,
    color: mainColors.whiteColor,
    fontSize: wp(3.4),
    flex: 1,
    textAlign: 'center',
    padding: wp(0.5),
    borderRadius: wp(1),
  },
  menuButton: {
    alignSelf: 'flex-end',
    padding: wp(1.5),
    position: 'absolute',
    bottom: hp(6),
    right: wp(2),
    zIndex: 9999,
  },
  noFoodTxt: {
    fontFamily: Fonts.Roboto_Slab_Regular,
    fontSize: wp(4),
    color: mainColors.blackColor,
    alignSelf: 'center',
    marginBottom: hp(20),
  },
});
const RenderTextRow = (props: any) => {
  const {data} = props;
  const sllCancel =
    data?.orderQuantity - (data?.completedQuantity + data?.waitingQuantity);
  return (
    <View style={styles.viewRow}>
      <Text style={[styles.sllStyle, {color: '#F2DC10'}]}>
        {data?.waitingQuantity}
      </Text>
      <Text style={[styles.sllStyle, {color: mainColors.blackColor}]}>/</Text>
      <Text style={[styles.sllStyle, {color: '#7AC144'}]}>
        {data?.completedQuantity}
      </Text>
      <Text style={[styles.sllStyle, {color: mainColors.blackColor}]}>/</Text>
      <Text style={[styles.sllStyle, {color: '#EC2326'}]}>{sllCancel}</Text>
    </View>
  );
};
