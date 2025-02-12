import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {resetNavigation} from '../../utils/commonFunction';
import {SCREENS} from '../../navigation/screenNames';
import SplashScreen from 'react-native-splash-screen';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../theme/fonts';
import {IMAGES} from '../../assets/Images';

type Props = {};

const Splash = (props: Props) => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      resetNavigation(SCREENS.GetStarted);
    }, 3000);
  }, []);

  return (
    <View>
      <Image
        source={IMAGES.splash}
        style={{width: SCREEN_WIDTH, height: SCREEN_HEIGHT}}
      />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({});
