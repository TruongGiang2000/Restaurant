import React, {useRef, useState, useEffect} from 'react';
import {View, StyleSheet, Text, FlatList} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {mainColors, Fonts} from '../contants';
import Table from '../component/Table';
import {UNIT, STT, UNITACTIVE} from '../assets';
import * as Animatable from 'react-native-animatable';
import Ripple from 'react-native-material-ripple';
import FastImage from 'react-native-fast-image';
import lodash from 'lodash';
import {connect} from 'react-redux';
const Unit = (props: any) => {
  const {unit, codeUnit, onPress, showTable, style, listTable} = props;
  const renderTable = ({item, index}) => {
    let isLast = index == 2;
    return (
      <Table
        style={isLast ? undefined : styles.tableItem}
        codeTable={item.tableName}
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
  return (
    <>
      <View style={[style, styles.MainContainer]}>
        <Ripple onPress={onPress} style={styles.viewTitle}>
          <FastImage
            source={showTable ? UNITACTIVE : UNIT}
            resizeMode={'contain'}
            style={StyleSheet.absoluteFillObject}
          />
          <Text style={styles.title}>{unit}</Text>
        </Ripple>
        <View style={{flex: 1}}>
          <View style={styles.viewUnit}>
            <FastImage
              source={STT}
              resizeMode={'contain'}
              style={StyleSheet.absoluteFillObject}
            />
            <Text style={styles.unit}>{codeUnit}</Text>
          </View>
          <View style={styles.line} />
        </View>
      </View>
      <Animatable.View duration={400} animation={'fadeInUp'} easing={'linear'}>
        {showTable && (
          <FlatList
            data={listTable}
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
const mapStateFromProps = (state: any) => {
  return {
    listTable: state.systems.listTable,
  };
};
export default connect(mapStateFromProps, null)(Unit);
