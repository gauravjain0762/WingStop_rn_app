import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {commonFontStyle, hp} from '../../theme/fonts';

type Props = {
  icon?: any;
  title?: string;
  onPress?: () => void;
};

const SocialLoginButton = ({icon, title, onPress = () => {}}: Props) => {
  const {colors} = useTheme();
  const {i18n} = useTranslation();
  const styles = React.useMemo(
    () => getGlobalStyles({colors: colors, language: i18n.language}),
    [colors, i18n.language],
  );
  return (
    <TouchableOpacity style={styles.rowView} onPress={onPress}>
      <Image source={icon} style={styles.image} />
      <Text style={styles.titleText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default SocialLoginButton;

const getGlobalStyles = (props: any) => {
  const {colors, language} = props;
  return StyleSheet.create({
    rowView: {
      height: heightPercentageToDP(7),
      borderWidth: 1.5,
      borderColor: colors._C0C0C0,
      borderRadius: 13,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: hp(20),
      shadowColor: '#00000050',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
      backgroundColor: colors.white,
      flexDirection: 'row',
      paddingHorizontal: hp(20),
      gap: 10,
      flex: 1,
    },
    image: {
      height: heightPercentageToDP(2.5),
      width: heightPercentageToDP(2.5),
      resizeMode: 'contain',
    },
    titleText: {
      ...commonFontStyle('i_500', 12, colors.black),
    },
  });
};
