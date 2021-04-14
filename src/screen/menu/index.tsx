import React, {useEffect, useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {getScreenByList, mapOrderFood, useSocket} from '../../util';
import {Fonts, mainColors, MenuDummy} from '../../contants';
import ListMenu from './ListMenu';
import {View, Text, FlatList} from 'react-native';
import Ripple from 'react-native-material-ripple';
import {StyleSheet} from 'react-native';
import {ICON_BACK} from '../../assets';
import FastImage from 'react-native-fast-image';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {connect, useSelector} from 'react-redux';
import {ButtonCustom} from '../../component';
import {socketIo} from '../../util';
import {systems} from '../../redux';
const Tab = createMaterialTopTabNavigator();

const Tabs = ({state, descriptors, navigation, position}) => {
  const renderItem = ({item, index}) => {
    const isLastItem = index == state?.routes?.length - 1;
    const onPress = () => navigation?.navigate(item?.name);
    const isActive = state?.index == index;
    return (
      <Ripple
        style={{marginRight: isLastItem ? undefined : wp(8)}}
        onPress={onPress}>
        <Text
          style={[
            styles.textCategory,
            {color: isActive ? '#4DA851' : mainColors.blackColor},
          ]}>
          {item?.name}
        </Text>
        <View
          style={[
            styles.lineCategory,
            {backgroundColor: isActive ? '#4DA851' : undefined},
          ]}
        />
      </Ripple>
    );
  };
  return (
    <View style={{backgroundColor: mainColors.whiteColor}}>
      <FlatList
        data={state?.routes}
        renderItem={renderItem}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.containerTab}
      />
      <View style={styles.lineHeader} />
    </View>
  );
};
const MyTabs = (props: any) => {
  const {menu, orderFood, profileInfo} = useSelector((state: any) => ({
    menu: state?.systems?.menu,
    orderFood: state?.systems?.orderFood,
    profileInfo: state?.auth?.profileInfo,
  }));
  const {activeTable} = props?.route?.params;
  const totalMoney = orderFood.reduce((totalValue, currentValue) => {
    return totalValue + currentValue?.price[0].valuePrice;
  }, 0);
  const orderFoods = mapOrderFood(orderFood);
  const siteId = profileInfo?.siteId;
  const storeId = profileInfo?.storeId;

  const emitDataOrderFood = () => {
    const dataEmit = {
      query: {
        tables: [Object.values(activeTable)[0]],
      },
      body: {
        tables: [Object.values(activeTable)[0]],
        totalMoney,
        status: 1,
        createdBy: profileInfo?._id,
        noteGenerous: '',
        orderFoods,
        siteId,
        storeId,
      },
    };
    socketIo.emit('L-S-AddOrderItems', {
      ...dataEmit,
    });
    props.clearOrderFood();
    props?.navigation?.navigate('Home');
  };

  return (
    <>
      <View style={styles.header}>
        <Ripple
          style={styles.iconBack}
          onPress={() => props?.navigation?.goBack()}>
          <FastImage
            source={ICON_BACK}
            style={StyleSheet.absoluteFillObject}
            resizeMode={'contain'}
          />
        </Ripple>
        <Text style={styles.menuText}>Menu</Text>
        <FastImage
          source={ICON_BACK}
          style={[styles.iconBack, {opacity: 0}]}
          resizeMode={'contain'}
        />
      </View>
      <Tab.Navigator
        initialRouteName={'Gần đây'}
        lazy={true}
        lazyPreloadDistance={2}
        swipeEnabled={false}
        tabBar={Tabs}>
        {getScreenByList(Tab, menu, ListMenu, {})}
      </Tab.Navigator>
      <ButtonCustom
        title={'Xác nhận'}
        style={styles.btnConfirm}
        onPress={emitDataOrderFood}
      />
    </>
  );
};
export default connect(null, systems)(MyTabs);
const styles = StyleSheet.create({
  header: {
    backgroundColor: '#3E8A4F',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(3),
    paddingVertical: hp(2),
  },
  iconBack: {
    width: wp(5),
    height: wp(5),
  },
  menuText: {
    color: mainColors.whiteColor,
    fontSize: wp(4.5),
    fontFamily: Fonts.Roboto_Slab_Regular,
  },
  containerTab: {
    padding: wp(3),
    backgroundColor: mainColors.whiteColor,
  },
  textCategory: {
    fontFamily: Fonts.Roboto_Slab_Regular,
    fontSize: wp(4),
  },
  lineCategory: {
    width: '110%',
    height: 1,
    marginTop: hp(0.3),
  },
  btnConfirm: {
    width: wp(95),
    alignSelf: 'center',
    marginVertical: hp(1),
    height: hp(5),
    borderRadius: wp(1),
  },
  lineHeader: {
    width: '95%',
    height: 1,
    backgroundColor: mainColors.blackColor,
    alignSelf: 'center',
  },
});
