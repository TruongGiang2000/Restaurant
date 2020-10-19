import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const Background = (props: any) => {
  const {imageStyle, multipleFoodStyle, children, bottomBackground} = props;
  return (
    <View style={styles.MainContainer}>
      <View style={styles.topBackground}>
        <Image
          source={require('../assets/images/path2442.png')}
          resizeMode={'contain'}
          style={[styles.imageChild, imageStyle]}
        />
        <Image
          source={require('../assets/images/multiplefood.png')}
          resizeMode={'contain'}
          style={[styles.multipleFoodTop, multipleFoodStyle]}
        />
      </View>
      <View style={[styles.bottomBackground, bottomBackground]}>
        <Image
          source={require('../assets/images/path4850.png')}
          resizeMode={'contain'}
          style={[styles.imageChild, imageStyle]}
        />
        <Image
          source={require('../assets/images/multiplefood.png')}
          resizeMode={'contain'}
          style={[styles.multipleFoodBottom, multipleFoodStyle]}
        />
      </View>
      <View style={styles.children}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageChild: {
    width: wp('40'),
    height: hp('20'),
  },
  multipleFoodTop: {
    width: wp('30'),
    height: hp('20'),
    position: 'absolute',
    transform: [{rotate: '180deg'}],
  },
  multipleFoodBottom: {
    width: wp('30'),
    height: hp('20'),
    position: 'absolute',
  },
  topBackground: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    opacity: 0.5,
    marginLeft: wp('-4.7'),
  },
  bottomBackground: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginRight: wp('-4.7'),
    opacity: 0.5,
  },
  children: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
});
export default Background;
