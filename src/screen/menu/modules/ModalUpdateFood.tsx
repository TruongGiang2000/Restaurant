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
import {MENU_INFO, MODAL_DISH, ORDER_SIZE, ORDER_SLL} from '../../../assets';
import {styles} from './styles';
export const ModalUpdateFood = (props: any) => {
  const {item, isOverFood, onPushItem, updateOrderFoodCache} = props;

  const [showModal, setShowModal] = useState(false);
  const [heightModal, setHeightModal] = useState(0);
  const [sll, setSll] = useState(item?.sll);
  const [size, setSize] = useState(item?.size);
  const [note, setNote] = useState(item?.note);
  const isNumberHeight = typeof heightModal == 'number';
  const data = [
    {key: 'small', title: 'nhỏ'},
    {key: 'normal', title: 'vừa'},
    {key: 'large', title: 'lớn'},
  ];

  const getTitleSize = (key: string) => {
    const indexFind = data?.findIndex((it) => it.key == key);
    return indexFind > -1 ? data[indexFind].title : '';
  };

  const showModalFunc = () => setShowModal(true);
  const closeModalFunc = () => setShowModal(false);
  const setSizeFunc = (value) => setSize(value);

  const RenderSize = () => {
    return data.map((it, index) => {
      const activeSize = it?.key == size;
      return (
        <TouchableOpacity
          style={[styles.sizeView, activeSize && {backgroundColor: '#c19e59'}]}
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
    updateOrderFoodCache(data);
    closeModalFunc();
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
          <View style={styles.viewRowNormal}>
            <View style={styles.viewSll}>
              <FastImage
                source={ORDER_SLL}
                style={StyleSheet.absoluteFillObject}
                resizeMode={'contain'}
              />
              <Text style={styles.overFood}>{`Số lượng: ${item?.sll}`}</Text>
            </View>
            <View style={styles.viewSize}>
              <FastImage
                source={ORDER_SIZE}
                style={StyleSheet.absoluteFillObject}
                resizeMode={'contain'}
              />
              <Text style={styles.overFood}>{`Size: ${getTitleSize(
                item?.size,
              )}`}</Text>
            </View>
          </View>
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
              bottom: isNumberHeight ? heightModal - hp(5) : hp(33),
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
          <FastImage
            source={MODAL_DISH}
            style={StyleSheet.absoluteFillObject}
          />
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
              value={note}
            />
          </View>
          <ButtonCustom
            title={'Xác nhận'}
            titleStyle={{fontSize: wp(5), color: mainColors.blackColor}}
            style={styles.btnOrder}
            onPress={pushItem}
          />
        </View>
      </Modal>
    </>
  );
};
