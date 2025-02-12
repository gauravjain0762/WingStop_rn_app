import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {resetNavigation} from '../../utils/commonFunction';
import {SCREENS} from '../../navigation/screenNames';

type Props = {};

const SplashScreen = (props: Props) => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      resetNavigation(SCREENS.LoginScreen);
    }, 3000);
  }, []);

  return (
    <SafeAreaView>
      <Text style={{color: 'red'}}>SplashScreen</Text>
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
