import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Background from '../../component/Background';
import {mainColors} from '../../contants/Colors';
const Login = (props: any) => {
  return (
    <Background
      imageStyle={styles.image}
      multipleFoodStyle={styles.multipleFood}
      bottomBackground={styles.bottomBackground}>
      <View style={styles.MainContainer}>
        <Text style={styles.loginTxt}>Đăng nhập</Text>
        <TextInput
          style={styles.input}
          placeholder={'Tài khoản'}
          placeholderTextColor={mainColors.titleColor}
        />
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: wp('70'),
    height: hp('40'),
  },
  multipleFood: {
    width: wp('55'),
    height: hp('40'),
  },
  loginTxt: {
    fontFamily: 'roboto-slab-bold',
    fontSize: wp('9'),
    color: mainColors.titleColor,
    marginTop: hp('25'),
  },
  bottomBackground: {
    marginRight: 0,
  },
  input: {
    width: wp('80'),
    marginTop: hp('5'),
    borderWidth: 1,
    borderColor: mainColors.titleColor,
    borderRadius: wp('2'),
    opacity: 0.5,
  },
  placeHolderStyle: {
    color: mainColors.titleColor,
  },
});
export default Login;
