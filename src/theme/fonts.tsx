import {RFValue} from 'react-native-responsive-fontsize';

export function getFontType(fontWeight: any) {
  if (fontWeight == '600') {
    return 'Gilroy-SemiBold';
  } else if (fontWeight == '400') {
    return 'Gilroy-Regular';
  } else if (fontWeight == '700') {
    return 'Gilroy-Bold';
  } else if (fontWeight == '800') {
    return 'Gilroy-ExtraBold';
  } else if (fontWeight == '500') {
    return 'Gilroy-Medium';
  } else if (fontWeight == '300') {
    return 'Gilroy-Light';
  } else if (fontWeight == 'i_600') {
    return 'Inter_18pt-SemiBold';
  } else if (fontWeight == 'i_400') {
    return 'Inter_18pt-Regular';
  } else if (fontWeight == 'i_700') {
    return 'Inter_18pt-Bold';
  } else if (fontWeight == 'i_800') {
    return 'Inter_18pt-ExtraBold';
  } else if (fontWeight == 'i_500') {
    return 'Inter_18pt-Medium';
  } else if (fontWeight == 'i_300') {
    return 'Inter_18pt-Light';
  } else {
    return 'Gilroy-Regular';
  }
}

export const commonFontStyle = (fontWeight: any, fontSize: any, color: any) => {
  return {
    fontFamily: getFontType(fontWeight),
    fontSize: RFValue(fontSize, SCREEN_HEIGHT),
    color: color,
    includeFontPadding: false,
  };
};

import {Dimensions, Platform, PixelRatio} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

export const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} =
  Dimensions.get('window');

export const hp = (i: any) => {
  return widthPercentageToDP((i * 100) / SCREEN_WIDTH);
};

export const wp = (i: any) => {
  return heightPercentageToDP((i * 100) / SCREEN_HEIGHT);
};

const scale = SCREEN_WIDTH / 320;

export function actuatedNormalize(size: any) {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}
