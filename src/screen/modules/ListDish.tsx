import React from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Fonts} from '../../contants';
import {ButtonCustom} from './../../component';
import {DummyListDish, mainColors} from '../../contants';
import {ScrollView} from 'react-native-gesture-handler';
export const ListDish = (props: any) => {
  const {style, navigation} = props;
  const getColorByStatus = (status: string) => {
    switch (status) {
      case 'Hoàn thành':
        return '#3E8A4F';
      case 'Đang đợi':
        return '#F3E205';
      default:
        return '#ED1F24';
    }
  };
  const renderItem = ({item}) => {
    const isComplete = item.status == 'Hoàn thành';
    return (
      <View style={styles.viewRowHeader}>
        <Text style={styles.mealStyle}>{item?.meal}</Text>
        {isComplete ? (
          <Text style={styles.completeStyle}>{item?.sllComplete}</Text>
        ) : (
          <RenderTextRow data={item} />
        )}
        <Text style={styles.priceStyle}>{item?.price}</Text>
        <Text
          style={[
            styles.statusStyle,
            {backgroundColor: getColorByStatus(item?.status)},
          ]}
          numberOfLines={2}>
          {item?.status}
        </Text>
      </View>
    );
  };
  return (
    <View style={[styles.MainContainer, style]}>
      <View style={styles.viewRowHeader}>
        <Text style={[styles.titleHeader, {textAlign: 'left'}]}>Món</Text>
        <Text style={styles.titleHeader}>Số lượng</Text>
        <Text style={styles.titleHeader}>Giá</Text>
        <Text style={styles.titleHeader}>Trạng thái</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <FlatList
          data={DummyListDish}
          renderItem={renderItem}
          scrollEnabled={false}
          keyExtractor={(item, index) => `${item}${index}`}
          listKey={'ListDishUniKey'}
        />
      </ScrollView>
      <ButtonCustom
        title={'Menu'}
        style={styles.menuButton}
        titleStyle={{fontSize: wp(4)}}
        onPress={() => navigation.navigate('MyTabs')}
      />
      <ButtonCustom
        title={'Thanh toán'}
        style={styles.styleButton}
        titleStyle={styles.titleButtonStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    borderWidth: 2,
    borderColor: '#333333',
    borderRadius: wp('2'),
    maxHeight: hp('50'),
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
  titleButtonStyle: {
    fontSize: wp('4.5'),
  },
  viewRowHeader: {
    flexDirection: 'row',
    paddingHorizontal: wp('2'),
    paddingVertical: hp('1'),
    alignItems: 'center',
  },
  titleHeader: {
    fontFamily: Fonts.Roboto_Stab_Bold,
    fontSize: wp('4'),
    flex: 1,
    textAlign: 'center',
  },
  completeStyle: {
    color: mainColors.colorCompleteText,
    fontFamily: Fonts.Roboto_Slab_Regular,
    fontSize: wp(3.8),
    textAlign: 'center',
    flex: 1,
  },
  watingStyle: {
    color: mainColors.colorWaitingText,
    fontFamily: Fonts.Roboto_Slab_Regular,
  },
  cancelStyle: {
    color: mainColors.colorCancelText,
    fontFamily: Fonts.Roboto_Slab_Regular,
  },
  mealStyle: {
    fontFamily: Fonts.Roboto_Slab_Regular,
    color: mainColors.titleColor,
    fontSize: wp(3.4),
    flex: 1,
  },
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  priceStyle: {
    fontFamily: Fonts.Roboto_Slab_Regular,
    color: mainColors.titleColor,
    fontSize: wp(3.4),
    flex: 1,
    textAlign: 'center',
  },
  sllStyle: {
    fontFamily: Fonts.Roboto_Slab_Regular,
    color: mainColors.titleColor,
    fontSize: wp(3.4),
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
  menuButton: {
    alignSelf: 'flex-end',
    padding: wp(1.5),
    position: 'absolute',
    bottom: hp(6),
    right: wp(2),
    zIndex: 9999,
  },
});
const RenderTextRow = (props: any) => {
  const {data} = props;
  return (
    <View style={styles.viewRow}>
      <Text style={[styles.sllStyle, {color: '#F2DC10'}]}>{data?.sllWait}</Text>
      <Text style={[styles.sllStyle, {color: mainColors.blackColor}]}>/</Text>
      <Text style={[styles.sllStyle, {color: '#7AC144'}]}>
        {data?.sllComplete}
      </Text>
      <Text style={[styles.sllStyle, {color: mainColors.blackColor}]}>/</Text>
      <Text style={[styles.sllStyle, {color: '#EC2326'}]}>
        {data?.sllCancel}
      </Text>
    </View>
  );
};
