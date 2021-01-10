import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {BACKGROUND} from '../assets';
export const BackgroundBig = (props: any) => {
  const {children} = props;
  return (
    <ImageBackground
      resizeMode={'cover'}
      source={BACKGROUND}
      style={styles.MainContainer}>
      <ScrollView>{children}</ScrollView>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  MainContainer: {
    height: '100%',
    flex: 1,
    width: '100%',
  },
});
