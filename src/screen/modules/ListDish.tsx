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
import {ItemLishDist} from './ItemListDish';
export const ListDish = (props: any) => {
  const {style, navigation, activeTable, listOrderDish, idTable} = props;

  const renderItem = ({item}) => {
    return <ItemLishDist item={item} idTable={idTable} />;
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
  viewRowHeader: {
    flexDirection: 'row',
    paddingHorizontal: wp('2'),
    paddingVertical: hp('1'),
    alignItems: 'center',
  },
  titleButtonStyle: {
    fontSize: wp('4.5'),
  },
  titleHeader: {
    fontFamily: Fonts.Roboto_Stab_Bold,
    fontSize: wp('4'),
    flex: 1,
    textAlign: 'center',
  },
  watingStyle: {
    color: mainColors.colorWaitingText,
    fontFamily: Fonts.Roboto_Slab_Regular,
  },
  cancelStyle: {
    color: mainColors.colorCancelText,
    fontFamily: Fonts.Roboto_Slab_Regular,
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
