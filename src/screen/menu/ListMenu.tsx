import React from 'react';
import {Text, StyleSheet, View, FlatList} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Fonts, mainColors} from '../../contants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {BackgroundSmall, ButtonCustom} from '../../component';
import {MENU_INFO, AMOUNT_MENU} from '../../assets';
export const ListMenu = (props: any) => {
  const params = props?.route?.params;
  const renderItem = ({item}) => {
    return (
      <View style={styles.viewRowItem}>
        <View style={styles.viewImgItem}>
          <FastImage
            source={{uri: item.img}}
            style={StyleSheet.absoluteFillObject}
            resizeMode={'cover'}
          />
        </View>
        <View>
          <View style={styles.menuInfoView}>
            <FastImage
              source={MENU_INFO}
              style={StyleSheet.absoluteFillObject}
              resizeMode={'contain'}
            />
            <Text style={styles.textInfoMenu} numberOfLines={1}>
              {item?.name}
            </Text>
            <Text
              style={styles.textInfoMenu}
              numberOfLines={1}>{`${item?.price} VNĐ`}</Text>
          </View>
          <View style={styles.line} />
          <View style={styles.viewSll}>
            <FastImage
              source={AMOUNT_MENU}
              style={StyleSheet.absoluteFillObject}
              resizeMode={'contain'}
            />
            <View style={styles.reduction}>
              <Text style={{fontSize: wp(4)}}>-</Text>
            </View>
            <Text>1</Text>
            <View style={styles.reduction}>
              <Text style={{fontSize: wp(4)}}>+</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };
  return (
    <BackgroundSmall>
      <View style={styles.lineHeader} />
      <FlatList
        data={params?.data}
        renderItem={renderItem}
        contentContainerStyle={styles.containerFlatlist}
      />
      <ButtonCustom title={'Xác nhận'} style={styles.btnConfirm} />
    </BackgroundSmall>
  );
};
const styles = StyleSheet.create({
  lineHeader: {
    width: '95%',
    height: 1,
    backgroundColor: mainColors.blackColor,
    alignSelf: 'center',
  },
  viewRowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(1),
  },
  viewImgItem: {
    width: wp(25),
    height: hp(13),
    borderWidth: 2,
    borderColor: mainColors.mainColor,
  },
  containerFlatlist: {
    paddingHorizontal: wp(2),
    marginTop: hp(2),
  },
  menuInfoView: {
    width: wp(65),
    height: wp(65) * 0.20674698795,
    marginLeft: 1,
    justifyContent: 'center',
    paddingLeft: wp(8),
  },
  textInfoMenu: {
    fontFamily: Fonts.Roboto_Slab_Regular,
    fontSize: wp(3.8),
    color: '#000',
  },
  btnConfirm: {
    width: '100%',
  },
  viewSll: {
    width: wp(17),
    height: wp(17) * 0.33333333333,
    marginLeft: wp(0.5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: wp(1),
    paddingRight: wp(4),
  },
  line: {
    height: 1.5,
    width: wp(40),
    backgroundColor: mainColors.blackColor,
    marginVertical: hp(0.5),
    marginLeft: wp(0.5),
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
});
