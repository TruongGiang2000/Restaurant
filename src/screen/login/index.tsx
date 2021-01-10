import React, {useState} from 'react';
import {View, StyleSheet, Text, Pressable} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {BackgroundBig, ButtonCustom} from '../../component';
import {mainColors} from '../../contants/Colors';
import TextInputCustom from '../../component/TextInputCustom';
import {Fonts} from '../../contants';
export const Login = (props: any) => {
  const [userName, setUserName] = useState('');
  const [pass, setPass] = useState('');
  const [txtErrorUser, setTxtErrorUser] = useState(null);
  const [txtErrorPass, setTxtErrorPass] = useState(null);
  const onChangeUser = (value: any) => {
    setUserName(value);
  };
  const onChangePass = (value: any) => {
    setPass(value);
  };
  const onPress = () => {
    // if (userName.trim() == 'MrCu' && pass.trim() == 'MrCu') {
    props.navigation.navigate('Home');
    // }
    // if (userName != 'MrCu') {
    //   setTxtErrorUser('Tài khoản không đúng!');
    // } else {
    //   setTxtErrorUser(null);
    // }
    // if (pass != 'MrCu') {
    //   setTxtErrorPass('Mật khẩu không đúng!');
    // } else {
    //   setTxtErrorPass(null);
    // }
  };
  return (
    <BackgroundBig>
      <View style={styles.MainContainer}>
        <Text style={styles.loginTxt}>Đăng nhập</Text>
        <TextInputCustom
          style={styles.topSpace}
          placeHolder={'Tài khoản'}
          onChangeText={onChangeUser}
          txtError={txtErrorUser}
        />
        <TextInputCustom
          style={styles.topSpace}
          placeHolder={'Mật khẩu'}
          onChangeText={onChangePass}
          secureTextEntry={true}
          txtError={txtErrorPass}
        />
        <ButtonCustom
          style={styles.button}
          onPress={onPress}
          title={'Đăng nhập'}
        />
      </View>
    </BackgroundBig>
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
    fontFamily: Fonts.Roboto_Stab_Bold,
    fontSize: wp('9'),
    color: mainColors.titleColor,
    marginTop: hp('25'),
  },
  bottomBackground: {
    marginRight: 0,
  },
  topSpace: {
    marginTop: hp('4'),
  },
  button: {
    width: wp('85'),
    paddingVertical: hp('2'),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp('4'),
  },
  txtInButton: {
    fontFamily: Fonts.Roboto_Slab_Regular,
    color: '#FDFEFF',
  },
});
