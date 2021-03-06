import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {getScreenByList} from '../../util';
import {Fonts, mainColors, MenuDummy} from '../../contants';
import {ListMenu} from './ListMenu';
import {View, Text, FlatList} from 'react-native';
import Ripple from 'react-native-material-ripple';
import {StyleSheet} from 'react-native';
import {ICON_BACK} from '../../assets';
import FastImage from 'react-native-fast-image';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
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
    <View>
      <FlatList
        data={state?.routes}
        renderItem={renderItem}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.containerTab}
      />
    </View>
  );
};
export const MyTabs = (props: any) => {
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
        {getScreenByList(Tab, MenuDummy, ListMenu, {})}
      </Tab.Navigator>
    </>
  );
};
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
});
