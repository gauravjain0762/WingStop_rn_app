import {
  KeyboardType,
  StyleSheet,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {colors} from '../../theme/colors';
import {commonFontStyle, hp, wp} from '../../theme/fonts';
import i18n from '../../locales/i18n';
import {textRTL} from '../../utils/arabicStyles';

type Props = {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  style?: ViewStyle;
  type?: any;
  code?: any;
  onChageCode?: (text: string) => void;
  data?: any;
  labelField?: any;
  valueField?: any;
  keyboardType?: KeyboardType;
  secureTextEntry?: boolean;
  multiline?: boolean;
  textAlignVertical?: 'auto' | 'center' | 'top' | 'bottom' | undefined;
  InputStyle?: TextStyle;
  placeholderColor?: any;
  maxLength?: number;
};

const Input = ({
  label,
  placeholder,
  value,
  onChangeText,
  style,
  type,
  code,
  onChageCode,
  data,
  labelField,
  valueField,
  keyboardType = 'default',
  secureTextEntry = false,
  multiline = false,
  textAlignVertical = 'auto',
  InputStyle,
  placeholderColor = colors.black,
  maxLength,
}: Props) => {
  return (
    <View style={[styles.container, style]}>
      <TextInput
        style={{...styles.input, ...InputStyle}}
        value={String(value)}
        onChangeText={text => onChangeText(text)}
        placeholder={placeholder}
        placeholderTextColor={placeholderColor}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        multiline={multiline}
        textAlignVertical={textAlignVertical}
        maxLength={maxLength}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors._6D6D6D,
    borderRadius: 10,
    marginBottom: hp(2),
    height: hp(58),
  },
  input: {
    flex: 1,
    paddingHorizontal: wp(26),
    ...textRTL(i18n.language),
    ...commonFontStyle(500, 18, colors.black),
    height: 45,
    top: 1,
  },
});
