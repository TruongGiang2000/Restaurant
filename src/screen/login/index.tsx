import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {BackgroundBig, ButtonCustom} from '../../component';
import TextInputCustom from '../../component/TextInputCustom';
import {Fonts} from '../../contants';
import {ICONMAIN} from '../../assets';
import {connect} from 'react-redux';
import {auth} from '../../redux';
import {actionMain} from '../../util';
const Login = (props: any) => {
  const [userName, setUserName] = useState('');
  const [pass, setPass] = useState('');
  const [txtErrorUser, setTxtErrorUser] = useState(null);
  const [txtErrorPass, setTxtErrorPass] = useState(null);
  const {navigation, token, signIn} = props;
  const onChangeUser = (value: any) => {
    if (!!value) {
      setTxtErrorUser('');
    } else {
      setTxtErrorUser('Tài khoản không được để trống');
    }
    setUserName(value);
  };
  const onChangePass = (value: any) => {
    if (!!value) {
      setTxtErrorPass('');
    } else {
      setTxtErrorPass('Mật khẩu không được để trống');
    }
    setPass(value);
  };
  const onPress = () => {
    if (!userName) {
      return setTxtErrorUser('Tài khoản không được để trống');
    }
    if (!pass) {
      return setTxtErrorPass('Mật khẩu không được để trống');
    }
    const dataLogin = {
      username: userName,
      password: pass,
    };
    console.log('loading');
    actionMain.loading(true);
    signIn(dataLogin);
  };
  useEffect(() => {
    !!token && navigation.navigate('Home');
  }, [token]);
  return (
    <BackgroundBig>
      <View style={styles.MainContainer}>
        <Image
          source={ICONMAIN}
          style={styles.iconMain}
          resizeMode={'contain'}
        />
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
  topSpace: {
    marginTop: hp('4'),
  },
  button: {
    width: wp('80'),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp('4'),
    height: hp('6'),
  },
  txtInButton: {
    fontFamily: Fonts.Roboto_Slab_Regular,
    color: '#FDFEFF',
  },
  iconMain: {
    width: wp(40),
    height: wp(40),
    marginTop: hp(8),
  },
});
const mapStateFromProps = (state: any) => {
  return {
    token: state.auth.token,
  };
};
export default connect(mapStateFromProps, auth)(Login);
