import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useTheme} from '@react-navigation/native';
import {ActionSheet} from '../../component';
// import EditPicture from '../../component/common/EditPicture';
import {AppStyles} from '../../theme/appStyles';

type Props = {};

const LoginScreen = (props: Props) => {
  const {colors} = useTheme();
  const styles = React.useMemo(() => getGlobalStyles({colors}), [colors]);

  return (
    <View style={AppStyles.flex}>
      <Text>LoginScreen</Text>
      {/* <EditPicture /> */}
    </View>
  );
};

export default LoginScreen;

const getGlobalStyles = (props: any) => {
  const {colors} = props;
  return StyleSheet.create({});
};
