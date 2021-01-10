import React, {useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  Pressable,
  FlatList,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {mainColors, Fonts} from '../contants';
import Table from '../component/Table';
import {UNIT, STT, UNITACTIVE} from '../assets';
import * as Animatable from 'react-native-animatable';
const Unit = (props: any) => {
  const data = [
    [{key: 'Bàn 1'}, {key: 'Bàn 2'}, {key: 'Bàn 3'}],
    [{key: 'Bàn 4'}, {key: 'Bàn 5'}],
    [{key: 'Bàn 7'}, {key: 'Bàn 8'}, {key: 'Bàn 9'}],
    [{key: 'Bàn 10'}, {key: 'Bàn 11'}],
    [{key: 'Bàn 7'}, {key: 'Bàn 8'}, {key: 'Bàn 9'}],
    [{key: 'Bàn 10'}, {key: 'Bàn 11'}],
    [{key: 'Bàn 7'}, {key: 'Bàn 8'}, {key: 'Bàn 9'}],
    [{key: 'Bàn 10'}, {key: 'Bàn 11'}],
  ];
  const renderTable = ({item, index}) => {
    let isLast = index == 2;
    return (
      <Table
        style={isLast ? undefined : styles.tableItem}
        codeTable={item.key}
      />
    );
  };
  const renderItem = ({item}) => {
    return (
      <View style={styles.viewFlatListChild}>
        <FlatList
          data={item}
          renderItem={renderTable}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
        />
      </View>
    );
  };
  const {unit, codeUnit, onPress, showTable, style} = props;
  return (
    <>
      <View style={[style, styles.MainContainer]}>
        <Pressable onPress={onPress}>
          <ImageBackground
            source={showTable ? UNITACTIVE : UNIT}
            resizeMode={'contain'}
            style={styles.viewTitle}>
            <Text style={styles.title}>{unit}</Text>
          </ImageBackground>
        </Pressable>
        <Pressable style={{flex: 1}} onPress={onPress}>
          <ImageBackground
            source={STT}
            resizeMode={'center'}
            style={styles.viewUnit}>
            <Text style={styles.unit}>{codeUnit}</Text>
          </ImageBackground>
          <View style={styles.line} />
        </Pressable>
      </View>
      <Animatable.View animation={showTable ? 'slideInUp' : 'slideOutDown'}>
        {showTable && (
          <FlatList
            data={data}
            renderItem={renderItem}
            style={styles.flatList}
          />
        )}
      </Animatable.View>
    </>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewTitle: {
    width: wp('35'),
    height: hp('6'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: wp('6'),
    fontFamily: Fonts.Roboto_Stab_Bold,
  },
  viewUnit: {
    width: wp('20'),
    height: hp('4'),
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: wp('-6.0'),
  },
  unit: {
    fontSize: wp('6'),
    fontFamily: Fonts.Roboto_Stab_Bold,
    color: mainColors.whiteColor,
  },
  line: {
    height: 2,
    backgroundColor: '#000',
    marginLeft: wp('-4.6'),
    marginTop: wp('1'),
    width: '100%',
  },
  flatList: {
    marginTop: hp('3'),
  },
  viewFlatListChild: {
    alignItems: 'center',
    paddingHorizontal: wp('4'),
    marginBottom: wp('2'),
  },
  tableItem: {
    marginRight: wp('5'),
  },
  fadingContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'powderblue',
  },
});
export default Unit;
