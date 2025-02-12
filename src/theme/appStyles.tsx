import {StyleSheet} from 'react-native';
import {colors} from './colors';
import {hp, wp} from './fonts';

export const AppStyles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  mainWhiteContainer: {
    flex: 1,
    backgroundColor: colors.bgColor,
  },
  mainSide: {
    paddingHorizontal: wp(20),
  },
});
