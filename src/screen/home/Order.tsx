import React, {useState, useRef} from 'react';
import {View, StyleSheet, Text, FlatList} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Unit from '../../component/Unit';
import {BackgroundSmall} from '../../component';
import {mainColors, Fonts, DataStatus} from '../../contants';
import {connect} from 'react-redux';
import {mapDataListTable} from '../../util';
const Order = (props: any) => {
  const [active, setActive] = useState({});
  const {listArea, navigation} = props;
  const onPress = (item: any) => () => {
    if (Object.values(active).some((it) => it === item._id)) {
      const filterItem = Object.values(active).filter((it) => it != item._id);
      return setActive(filterItem);
    }
    setActive({...active, [item._id]: item._id});
  };
  const renderItem = ({item, index}) => {
    const area = item?.area;
    const showTable = Object.values(active).some((it) => it === area._id);
    const listTables = mapDataListTable(item?.tables);
    return (
      <Unit
        unit={area.areaUnit}
        codeUnit={area.areaName}
        onPress={onPress(area)}
        style={index == 0 ? undefined : {marginTop: hp('3')}}
        showTable={showTable}
        navigation={navigation}
        listTables={listTables}
      />
    );
  };
  return (
    <BackgroundSmall isScroll={false} style={styles.MainContainer}>
      <FlatList
        data={listArea}
        renderItem={renderItem}
        contentContainerStyle={{marginHorizontal: wp('2')}}
      />
      <View style={[styles.row, {flexWrap: 'wrap', width: '80%'}]}>
        {DataStatus?.map((status) => {
          return (
            <View style={[styles.row, {width: wp(35)}]} key={`${status.title}`}>
              <View
                style={[styles.noteFood, {backgroundColor: status.color}]}
              />
              <Text>{status.title}</Text>
            </View>
          );
        })}
      </View>
    </BackgroundSmall>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'flex-end',
    flex: 1,
    paddingTop: hp('2'),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: wp('2'),
    marginVertical: hp('1'),
  },
  noteFood: {
    width: wp('6.5'),
    height: hp('2'),
    borderRadius: wp('1'),
    borderWidth: 2,
    borderColor: '#333333',
    marginRight: wp(1.5),
  },
  txtNote: {
    fontFamily: Fonts.Roboto_Slab_Regular,
    color: mainColors.blackColor,
    fontSize: wp('2.5'),
    marginLeft: wp('1'),
  },
});
const mapStateFromProps = (state: any) => {
  return {
    listArea: state.systems.listArea,
  };
};
export default connect(mapStateFromProps, null)(Order);
