import React from 'react';
import Modal from 'react-native-modal';
import {View, StyleSheet, Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Fonts, mainColors} from '../contants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ButtonCustom} from '../component';
import Ripple from 'react-native-material-ripple';
export const ModalWarning = (props: any) => {
  const {title, content, onPressClose, actionRight} = props;
  return (
    <Modal isVisible={true}>
      <View style={styles.container}>
        <Ripple style={styles.btnIconClose} onPress={onPressClose}>
          <MaterialCommunityIcons
            name={'close'}
            color={mainColors.blackColor}
            size={wp(5)}
          />
        </Ripple>
        <MaterialCommunityIcons
          name={'information'}
          color={'yellow'}
          size={wp(7)}
          style={{alignSelf: 'center'}}
        />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.content}>{content}</Text>
        <ButtonCustom
          title={'Đóng'}
          style={styles.btnStyle}
          onPress={actionRight}
        />
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: mainColors.whiteColor,
    paddingHorizontal: wp(3),
    paddingVertical: hp(1),
    borderRadius: wp(1),
  },
  title: {
    color: mainColors.blackColor,
    fontSize: wp(5),
    alignSelf: 'center',
    fontFamily: Fonts.Roboto_Stab_Bold,
  },
  content: {
    color: mainColors.blackColor,
    marginTop: hp(1),
    fontFamily: Fonts.Roboto_Slab_Regular,
    textAlign: 'center',
    fontSize: wp(4),
  },
  btnStyle: {
    backgroundColor: '#C1C1C1',
    alignItems: 'center',
    width: wp(40),
    alignSelf: 'center',
    marginTop: hp(1.5),
    paddingVertical: hp(0.5),
  },
  btnIconClose: {
    width: wp(5),
    height: wp(5),
    alignSelf: 'flex-end',
  },
});
