import React, {useRef, useState, useEffect} from 'react';
import {View, StyleSheet, Text, FlatList} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {mainColors, Fonts} from '../contants';
import Table from '../component/Table';
import {UNIT, STT, UNITACTIVE} from '../assets';
import Ripple from 'react-native-material-ripple';
import FastImage from 'react-native-fast-image';
import {connect} from 'react-redux';
import {ListDish} from '../screen/modules';
import lodash from 'lodash';
import {getColorByStatus, getOrderByTable} from '../util';
import {ScrollView} from 'react-native-gesture-handler';
const Unit = (props: any) => {
  const {
    unit,
    codeUnit,
    onPress,
    showTable,
    style,
    navigation,
    listTables,
  } = props;
  const [activeTable, setActiveTable] = useState({});
  const refFlatListMain = useRef<any>();
  const [indexScroll, setIndexScroll] = useState<number>(undefined);

  const onPressTable = (item: any) => () => {
    if (Object.values(activeTable).some((it) => it === item._id)) {
      const filterItem = Object.values(activeTable).filter(
        (it) => it != item._id,
      );
      return setActiveTable(filterItem);
    }
    setActiveTable({[item._id]: item._id});
  };
  const renderTable = ({item, index}) => {
    let isLast = index == 2;
    const isActiveTable = Object.values(activeTable).some(
      (it) => it === item._id,
    );
    return (
      <Table
        style={[
          isLast ? undefined : styles.tableItem,
          isActiveTable ? styles.activeTable : undefined,
        ]}
        codeTable={item.tableName}
        onPress={onPressTable(item)}
        backgroundColor={getColorByStatus(item?.status)}
      />
    );
  };

  // useEffect(() => {
  //   if (indexScroll && refFlatListMain.current)
  //     refFlatListMain.current.scrollToIndex({animated: true, indexScroll});
  // }, [indexScroll]);

  const renderItem = ({item, index}) => {
    // const getFirstItem = lodash.get(Object.values(activeTable), '[0]', {});
    // const isRightHozi = item.findIndex((it) => it?._id == getFirstItem);
    // isRightHozi != -1 ? setIndexScroll(index) : setIndexScroll(undefined);
    return (
      <View style={styles.viewFlatListChild}>
        <FlatList
          data={item}
          renderItem={renderTable}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          listKey={'TableHorizontal'}
        />
      </View>
    );
  };
  const isShowListDish = !lodash?.isEmpty(activeTable);
  const idTable = isShowListDish ? Object.values(activeTable)[0] : '';
  const listOrderDish = getOrderByTable(idTable);
  return (
    <>
      <View style={[styles.MainContainer, style]}>
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
      {showTable && (
        <>
          <ScrollView
            style={{maxHeight: isShowListDish ? hp(25) : undefined}}
            showsVerticalScrollIndicator={false}>
            <FlatList
              ref={refFlatListMain}
              data={listTables}
              renderItem={renderItem}
              style={styles.flatList}
            />
          </ScrollView>
          {isShowListDish && (
            <ListDish
              navigation={navigation}
              activeTable={activeTable}
              listOrderDish={listOrderDish}
            />
          )}
        </>
      )}
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
    marginTop: hp('1'),
  },
  viewFlatListChild: {
    alignItems: 'center',
    paddingHorizontal: wp('4'),
  },
  tableItem: {
    marginRight: wp('5'),
  },
  activeTable: {
    borderWidth: 4,
    borderColor: '#ED2024',
  },
});
const mapStateFromProps = (state: any) => {
  return {};
};
export default connect(mapStateFromProps, null)(Unit);
