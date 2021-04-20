import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Fonts, mainColors} from '../../../contants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Modal from 'react-native-modal';
import {ButtonCustom} from '../../../component';
import {MENU_INFO, STATUS_OVER} from '../../../assets';
export const ModalUpdateFood = (props: any) => {
  const [showModal, setShowModal] = useState(false);
  const [heightModal, setHeightModal] = useState(0);
  const [sll, setSll] = useState(1);
  const [size, setSize] = useState('small');
  const [note, setNote] = useState('');
  const {item, isOverFood, onPushItem} = props;
  const isNumberHeight = typeof heightModal == 'number';
  const data = [
    {key: 'small', title: 'nhỏ'},
    {key: 'normal', title: 'vừa'},
    {key: 'large', title: 'lớn'},
  ];

  const showModalFunc = () => setShowModal(true);
  const closeModalFunc = () => setShowModal(false);
  const setSizeFunc = (value) => setSize(value);

  const RenderSize = () => {
    return data.map((it, index) => {
      const activeSize = it?.key == size;
      return (
        <TouchableOpacity
          style={[
            styles.sizeView,
            activeSize && {backgroundColor: mainColors.mainColor},
          ]}
          key={`${it?.key}${index}`}
          onPress={() => setSizeFunc(it?.key)}>
          <Text
            style={[
              styles.sizeTitle,
              activeSize && {color: mainColors.whiteColor},
            ]}>
            {it?.title}
          </Text>
        </TouchableOpacity>
      );
    });
  };
  const pushItem = () => {
    const data = {...item, sll, size, note};
    onPushItem(data);
    closeModalFunc();
    setSll(1);
    setNote('');
    setSize('small');
  };

  const reduceSll = () => setSll(sll - 1);
  const raiseSll = () => setSll(sll + 1);
  return (
    <>
      <TouchableOpacity
        style={styles.viewRowItem}
        activeOpacity={0.7}
        disabled={isOverFood}
        onPress={showModalFunc}>
        <View style={styles.viewImgItem}>
          <FastImage
            source={{uri: item?.urlImage}}
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
              {item?.foodName}
            </Text>
            <Text
              style={styles.textInfoMenu}
              numberOfLines={1}>{`${item?.price[0]?.valuePrice} VNĐ`}</Text>
          </View>
          <View style={styles.line} />
          {isOverFood && (
            <View style={styles.viewSll}>
              <FastImage
                source={STATUS_OVER}
                style={StyleSheet.absoluteFillObject}
                resizeMode={'contain'}
              />
              <Text style={styles.overFood}>Đã hết</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
      <Modal
        isVisible={showModal}
        onBackdropPress={closeModalFunc}
        useNativeDriver={true}
        style={styles.styleModal}>
        <View
          style={[
            styles.viewImageModal,
            {
              bottom: isNumberHeight ? heightModal - hp(3) : hp(33),
            },
          ]}>
          <FastImage
            source={{
              uri: item?.urlImage,
            }}
            style={[StyleSheet.absoluteFillObject]}
          />
        </View>
        <View
          style={styles.container}
          onLayout={({nativeEvent}) =>
            setHeightModal(nativeEvent.layout.height)
          }>
          <View style={{paddingHorizontal: wp(4)}}>
            <View style={styles.rowSpaceBetween}>
              <Text style={styles.nameFoodModal}>{item?.foodName}</Text>
              <Text
                style={{
                  color: '#c19e59',
                  fontSize: wp(4),
                  fontFamily: Fonts.Roboto_Stab_Bold,
                }}>
                {`${item?.price[0]?.valuePrice} VNĐ`}
              </Text>
            </View>
            <View style={styles.viewRowItem}>
              <Text style={styles.titleModal}>Số lượng: </Text>
              <View style={styles.viewSllModal}>
                <TouchableOpacity
                  hitSlop={styles.hitSlopSll}
                  disabled={sll == 1}
                  onPress={reduceSll}>
                  <Text style={styles.controlSll}>-</Text>
                </TouchableOpacity>
                <Text style={styles.sllText}>{sll}</Text>
                <TouchableOpacity
                  hitSlop={styles.hitSlopSll}
                  onPress={raiseSll}>
                  <Text style={styles.controlSll}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.viewRowItem}>
              <Text style={styles.titleModal}>Size: </Text>
              {RenderSize()}
            </View>
            <Text
              style={[
                styles.titleModal,
                {fontWeight: 'bold', marginTop: hp(1)},
              ]}>
              Ghi chú về món ăn
            </Text>
            <TextInput
              style={styles.textInputStyle}
              placeholder={'Thêm thịt và rau sống....'}
              multiline={true}
              numberOfLines={4}
              placeholderTextColor={'#000'}
              onChangeText={(value) => setNote(value)}
            />
          </View>
          <ButtonCustom
            title={'Đặt món'}
            titleStyle={{fontSize: wp(5)}}
            style={styles.btnOrder}
            onPress={pushItem}
          />
        </View>
      </Modal>
    </>
  );
};
const styles = StyleSheet.create({
  styleModal: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: '#fff',
    width: wp(100),
    borderWidth: 2,
    borderColor: '#000',
    paddingTop: hp(3),
    borderTopLeftRadius: wp(4),
    borderTopRightRadius: wp(4),
  },
  nameFoodModal: {
    color: mainColors.blackColor,
    fontFamily: Fonts.Roboto_Stab_Bold,
    fontSize: wp(4),
    width: '60%',
  },
  titleModal: {
    fontSize: wp(4),
    color: mainColors.blackColor,
    fontFamily: Fonts.Roboto_Slab_Regular,
  },
  viewImageModal: {
    width: wp(26),
    height: wp(28),
    borderWidth: 2,
    borderColor: mainColors.blackColor,
    overflow: 'hidden',
    borderRadius: wp(2),
    zIndex: 999,
    position: 'absolute',
  },
  viewSllModal: {
    marginTop: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: mainColors.blackColor,
    paddingHorizontal: wp(2),
    borderRadius: wp(1),
    paddingVertical: wp(0.5),
    marginStart: wp(4),
  },

  controlSll: {
    fontSize: wp(5),
    fontFamily: Fonts.Roboto_Stab_Bold,
  },
  sllText: {
    fontSize: wp(4),
    color: mainColors.mainColor,
    marginHorizontal: wp(2),
    fontFamily: Fonts.Roboto_Stab_Bold,
  },
  hitSlopSll: {
    top: 5,
    bottom: 5,
    left: 5,
    right: 5,
  },
  viewRowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(1),
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sizeView: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: mainColors.blackColor,
    borderRadius: wp(2),
    paddingVertical: wp(1),
    marginStart: wp(2.5),
    paddingHorizontal: wp(2),
  },
  sizeTitle: {
    fontFamily: Fonts.Roboto_Slab_Light,
    color: mainColors.blackColor,
    fontSize: wp(4),
  },
  btnOrder: {
    alignItems: 'center',
    paddingVertical: hp(0.8),
    borderRadius: wp(1),
    marginTop: hp(1),
    marginBottom: hp(1.5),
    marginHorizontal: wp(1.5),
  },
  viewImgItem: {
    width: wp(25),
    height: hp(13),
    borderWidth: 2,
    borderColor: mainColors.mainColor,
  },
  menuInfoView: {
    width: wp(65),
    height: wp(65) * 0.20674698795,
    marginLeft: 1,
    justifyContent: 'center',
    paddingLeft: wp(6),
  },
  textInfoMenu: {
    fontFamily: Fonts.Roboto_Slab_Regular,
    fontSize: wp(3.2),
    color: '#000',
    width: '70%',
  },
  line: {
    height: 1.5,
    width: wp(40),
    backgroundColor: mainColors.blackColor,
    marginVertical: hp(0.5),
    marginLeft: wp(0.5),
  },
  viewSll: {
    width: wp(15),
    height: wp(15) * 0.33333333333,
    marginLeft: wp(0.5),
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: wp(3),
  },
  textInputStyle: {
    borderColor: '#000',
    borderWidth: 1,
    padding: 0,
    paddingLeft: wp(2),
    backgroundColor: '#F0EFEF',
    color: '#000',
    fontFamily: Fonts.Roboto_Slab_Regular,
    borderRadius: wp(2),
  },
  overFood: {
    fontFamily: Fonts.Roboto_Slab_Regular,
    fontSize: wp(3),
    color: mainColors.whiteColor,
  },
});
