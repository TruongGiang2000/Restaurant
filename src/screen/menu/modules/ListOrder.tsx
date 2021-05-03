import React, {useState} from 'react';
import {View, StyleSheet, Text, FlatList} from 'react-native';
import {connect} from 'react-redux';
import {BackgroundSmall, ButtonCustom} from '../../../component';
import {systems} from '../../../redux';
import Ripple from 'react-native-material-ripple';
import FastImage from 'react-native-fast-image';
import {ICON_BACK} from '../../../assets';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {mainColors, Fonts} from '../../../contants';
import {ModalUpdateFood} from '../modules';
import {ScrollView} from 'react-native-gesture-handler';
import lodash from 'lodash';
const ListOrder = (props: any) => {
  const {orderFood, updateOrderFood} = props;
  const _orderFood = lodash.cloneDeep(orderFood);
  const [orderFoodCache, setOrderFoodCache] = useState<any>(_orderFood);
  const renderItem = ({item}) => {
    return (
      <ModalUpdateFood
        item={item}
        updateOrderFoodCache={updateOrderFoodCache}
      />
    );
  };
  const updateOrderFoodCache = (valueOrder) => {
    const orderIndex = orderFoodCache?.findIndex(
      (it) => it?._id == valueOrder?._id,
    );
    setOrderFoodCache((state) => {
      state?.splice(orderIndex, 1, valueOrder);
      return [...state];
    });
  };

  const goBack = () => {
    props?.navigation?.goBack();
  };

  const updateFoodMain = () => {
    updateOrderFood(orderFoodCache);
    props?.navigation?.goBack();
  };

  return (
    <BackgroundSmall>
      <View style={styles.header}>
        <Ripple style={styles.iconBack} onPress={goBack}>
          <FastImage
            source={ICON_BACK}
            style={StyleSheet.absoluteFillObject}
            resizeMode={'contain'}
          />
        </Ripple>
        <Text style={styles.menuText}>Giỏ hàng</Text>
        <FastImage
          source={ICON_BACK}
          style={[styles.iconBack, {opacity: 0}]}
          resizeMode={'contain'}
        />
      </View>
      <ScrollView>
        <FlatList
          data={orderFoodCache}
          renderItem={renderItem}
          style={{marginLeft: wp(4), marginTop: hp(2)}}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          extraData={orderFoodCache}
        />
      </ScrollView>
      <ButtonCustom
        title={'Cập nhật'}
        style={styles.btnConfirm}
        onPress={updateFoodMain}
      />
    </BackgroundSmall>
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
  btnConfirm: {
    width: wp(95),
    alignSelf: 'center',
    marginVertical: hp(1),
    height: hp(5),
    borderRadius: wp(1),
  },
});
const mapStateFromProps = (state) => {
  return {
    orderFood: state?.systems?.orderFood,
  };
};
export default connect(mapStateFromProps, systems)(ListOrder);
