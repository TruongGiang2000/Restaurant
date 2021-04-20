import React from 'react';
import {StyleSheet, FlatList, View, Text, BackHandler} from 'react-native';
import {mainColors} from '../../contants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ModalOrderFood} from './modules';
import {BackgroundSmall} from '../../component';
import {connect, useSelector} from 'react-redux';
import {systems} from '../../redux';
import FastImage from 'react-native-fast-image';
import {DISH_STORE} from '../../assets';
import Ripple from 'react-native-material-ripple';
const ListMenu = (props: any) => {
  const params = props?.route?.params;
  const setItem = (item) => {
    props.setOrderFood(item);
  };
  const {orderFood} = useSelector((state: any) => ({
    orderFood: state?.systems?.orderFood,
  }));
  const renderItem = ({item, index}) => {
    const isOverFood = item?.status == 0;
    return (
      <ModalOrderFood
        item={item}
        isOverFood={isOverFood}
        onPushItem={(item) => setItem(item)}
      />
    );
  };
  const isNullOrder = orderFood?.length == 0;
  BackHandler.addEventListener('hardwareBackPress', () => {
    props?.navigation?.navigate('Home');
    return true;
  });
  return (
    <BackgroundSmall style={{justifyContent: 'flex-end'}}>
      <Ripple
        style={styles.dishStore}
        onPress={() => props?.navigation.navigate('ListOrder')}>
        <View style={[styles.viewSllStoreFood, isNullOrder && {opacity: 0}]}>
          <Text style={{color: mainColors.whiteColor, fontSize: wp(3)}}>
            {orderFood?.length}
          </Text>
        </View>
        <FastImage source={DISH_STORE} style={{width: '70%', height: '70%'}} />
      </Ripple>
      <FlatList
        data={params?.data}
        renderItem={renderItem}
        contentContainerStyle={styles.containerFlatlist}
      />
    </BackgroundSmall>
  );
};
const styles = StyleSheet.create({
  viewRowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(1),
  },
  containerFlatlist: {
    paddingHorizontal: wp(2),
  },
  reduction: {
    borderColor: mainColors.disableColor,
    width: wp(4),
    height: wp(4),
    borderRadius: wp(2),
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dishStore: {
    width: wp(12),
    height: wp(12),
    backgroundColor: mainColors.mainColor,
    borderRadius: wp(6),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginEnd: wp(2),
    marginTop: hp(1),
  },
  viewSllStoreFood: {
    width: wp(5),
    height: wp(5),
    backgroundColor: '#ED1C24',
    position: 'absolute',
    zIndex: 99,
    top: 0,
    right: 0,
    borderRadius: wp(2.5),
    borderWidth: 1,
    borderColor: mainColors.whiteColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnConfirm: {
    width: wp(95),
    alignSelf: 'center',
    marginVertical: hp(1),
    height: hp(5),
    borderRadius: wp(1),
  },
});
export default connect(null, systems)(ListMenu);
