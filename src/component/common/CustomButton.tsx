import {
  Image,
  StyleSheet,
  Text,
  ViewStyle,
  TouchableOpacity,
  TextStyle,
} from 'react-native';
import React from 'react';
import {colors} from '../../theme/colors';
import {commonFontStyle, hp} from '../../theme/fonts';

type Props = {
  title: string;
  extraStyle?: ViewStyle;
  onPress?: () => void;
  titleColor?: any;
  type?: 'blue' | 'gray';
  disabled?: boolean;
  leftIcon?: any;
  extraTextStyle: TextStyle;
  rightIcon?: any;
};

const CustomButton = ({
  titleColor,
  title,
  extraStyle,
  onPress,
  type = 'blue',
  leftIcon,
  disabled = false,
  extraTextStyle,
  rightIcon,
}: Props) => {
  return (
    <TouchableOpacity
      onPress={() => (onPress ? onPress() : {})}
      disabled={disabled}
      style={[styles.btnContainer, extraStyle]}>
      {leftIcon && <Image source={leftIcon} style={styles.rightArrow} />}
      <Text
        style={[
          styles.titleText,
          {
            color: titleColor ? titleColor : colors.white,
            ...extraTextStyle,
          },
        ]}>
        {title}
      </Text>
      {rightIcon && <Image source={rightIcon} style={styles.rightArrow} />}
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  btnContainer: {
    backgroundColor: colors.themeColor,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    height: 57,
    justifyContent: 'center',
  },

  rightArrow: {
    height: 19,
    width: 19,
    resizeMode: 'contain',
  },
  titleText: {
    ...commonFontStyle('i_500', 18, colors.white),
    textAlign: 'center',
  },
});
