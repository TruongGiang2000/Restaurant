import React, {useState} from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import Ripple from 'react-native-material-ripple';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Fonts, mainColors} from '../../contants';
import {
  getColorByStatusOrder,
  getStatusTextOrder,
  mapUpdateOrderFood,
  socketIo,
} from '../../util';
import Modal from 'react-native-modal';
import FastImage from 'react-native-fast-image';
import {MODAL_DISH} from '../../assets';
import {ButtonCustom} from '../../component';
import {useSelector} from 'react-redux';
export const ItemLishDist = (props: any) => {
  const {item, idTable} = props;
  const {orderFood, profileInfo} = useSelector((state: any) => ({
    orderFood: state?.systems?.orderFood,
    profileInfo: state?.auth?.profileInfo,
  }));
  const [modalAction, setModalAction] = useState(false);
  const [sll, setSll] = useState(1);
  const closeModal = () => setModalAction(false);
  const showModal = () => setModalAction(true);
  const reduceSll = () => setSll((preState) => preState - 1);
  const raiseSll = () => setSll((preState) => preState + 1);
  const isComplete = item.waitingQuantity == 0 && item?.completedQuantity != 0;
  const siteId = profileInfo?.siteId;
  const storeId = profileInfo?.storeId;

  const totalMoney = orderFood.reduce((totalValue, currentValue) => {
    return totalValue + currentValue?.price[0].valuePrice;
  }, 0);

  const emitDataSocket = (type: 0 | 1) => {
    const dataEmit = {
      query: {
        tables: [idTable],
      },
      body: {
        tables: [idTable],
        totalMoney,
        status: 1,
        createdBy: profileInfo?._id,
        noteGenerous: '',
        orderFoods: mapUpdateOrderFood(orderFood, type, sll),
        siteId,
        storeId,
      },
    };
    socketIo.emit('L-S-AddOrderItems', {
      ...dataEmit,
    });
    closeModal();
  };

  const cancelFood = () => emitDataSocket(0);

  const completeFood = () => emitDataSocket(1);
  return (
    <>
      <Ripple style={styles.viewRowHeader} onPress={showModal}>
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
      </Ripple>
      {modalAction && (
        <Modal
          style={styles.modalStyle}
          onBackdropPress={closeModal}
          isVisible={modalAction}>
          <View style={styles.modalDish}>
            <FastImage
              source={MODAL_DISH}
              style={StyleSheet.absoluteFillObject}
            />
            <View style={styles.viewSllModal}>
              <TouchableOpacity
                hitSlop={styles.hitSlopSll}
                disabled={sll == 1}
                onPress={reduceSll}>
                <Text style={styles.controlSll}>-</Text>
              </TouchableOpacity>
              <Text style={styles.sllText}>{sll}</Text>
              <TouchableOpacity hitSlop={styles.hitSlopSll} onPress={raiseSll}>
                <Text style={styles.controlSll}>+</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.viewBtn}>
              <ButtonCustom
                style={styles.cancelBtn}
                title={'Huỷ'}
                onPress={cancelFood}
              />
              <ButtonCustom
                style={styles.btnComplete}
                title={'Hoàn thành'}
                onPress={completeFood}
              />
            </View>
          </View>
        </Modal>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  viewRowHeader: {
    flexDirection: 'row',
    paddingHorizontal: wp('2'),
    paddingVertical: hp('1'),
    alignItems: 'center',
  },
  mealStyle: {
    fontFamily: Fonts.Roboto_Slab_Regular,
    color: mainColors.titleColor,
    fontSize: wp(3.4),
    flex: 1,
  },
  completeStyle: {
    color: mainColors.colorCompleteText,
    fontFamily: Fonts.Roboto_Slab_Regular,
    fontSize: wp(3.8),
    textAlign: 'center',
    flex: 1,
  },
  priceStyle: {
    fontFamily: Fonts.Roboto_Slab_Regular,
    color: mainColors.titleColor,
    fontSize: wp(3.4),
    flex: 1,
    textAlign: 'center',
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
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  sllStyle: {
    fontFamily: Fonts.Roboto_Slab_Regular,
    color: mainColors.titleColor,
    fontSize: wp(3.4),
  },
  viewSllModal: {
    marginTop: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderColor: mainColors.blackColor,
    paddingHorizontal: wp(2),
    borderRadius: wp(1),
    paddingVertical: hp(0.5),
    marginStart: wp(4),
    backgroundColor: mainColors.whiteColor,
    width: wp(50),
  },
  hitSlopSll: {
    top: 5,
    bottom: 5,
    left: 5,
    right: 5,
  },
  controlSll: {
    fontSize: wp(8),
    fontFamily: Fonts.Roboto_Slab_Regular,
  },
  sllText: {
    fontSize: wp(10),
    color: mainColors.blackColor,
    marginHorizontal: wp(4),
    fontFamily: Fonts.Roboto_Stab_Bold,
  },
  modalStyle: {alignItems: 'center', justifyContent: 'flex-end'},
  modalDish: {
    width: wp(80),
    height: wp(80) * 0.841982235,
    padding: wp(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: wp(2),
    width: '100%',
    justifyContent: 'center',
    height: hp(5),
  },
  cancelBtn: {
    backgroundColor: mainColors.colorCancelText,
    width: '40%',
    marginRight: wp(2),
    height: '100%',
  },
  btnComplete: {
    backgroundColor: mainColors.colorCompleteText,
    width: '40%',
    height: '100%',
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
