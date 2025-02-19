import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {AppStyles} from '../../theme/appStyles';
import CustomHeader from '../../component/common/CustomHeader';

const data = [
  {
    title: 'Profile',
  },
];

const AccountScreen = () => {
  return (
    <SafeAreaView style={AppStyles.mainWhiteContainer}>
      <CustomHeader isSetting={true} title={'Account'} />
    </SafeAreaView>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({});
