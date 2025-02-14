import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useTheme} from '@react-navigation/native';
import {ActionSheet} from '../../component';
// import EditPicture from '../../component/common/EditPicture';
import {AppStyles} from '../../theme/appStyles';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {setLangauge} from '../../redux/service/AuthServices';
import {successToast} from '../../utils/commonFunction';
import {IMAGES} from '../../assets/Images';
import {commonFontStyle} from '../../theme/fonts';
import {colors} from '../../theme/colors';
import {SCREENS} from '../../navigation/screenNames';
import {navigationRef} from '../../navigation/RootContainer';

type Props = {};

const GetStarted = ({navigation}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const {language} = useSelector(state => state.common);

  const onPressLanguage = selectAr => {
    if (selectAr) {
      dispatch(setLangauge('kn'));
    } else {
      dispatch(setLangauge('en'));
    }
    successToast(t('Language change successfully'));
  };

  const onGetStarted = () => {
    navigationRef.navigate(SCREENS.CheckoutScreen);
    // navigation.navigate(SCREENS.HomeScreen);
    // navigation.navigate(SCREENS.SignUpScreen);
  };

  return (
    <SafeAreaView
      style={[
        AppStyles.mainWhiteContainer,
        AppStyles.mainSide,
        {justifyContent: 'center', alignItems: 'center'},
      ]}>
      <Image source={IMAGES.logo} style={styles.logo} />

      <Text style={styles.title}>{t('Order More. Save More,')}</Text>
      <Text style={styles.subtitle}>
        {t('Earn points for every dirham you spend')}
      </Text>

      <View style={styles.languageContainer}>
        <TouchableOpacity
          onPress={() => {
            onPressLanguage(true);
          }}
          style={styles.languageButton}>
          <Image source={IMAGES.ar} style={styles.imageStyle} />
          <Text style={styles.lanText}>{t('Arabic')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            onPressLanguage(false);
          }}
          style={styles.languageButton}>
          <Image source={IMAGES.en} style={styles.imageStyle} />
          <Text style={styles.lanText}>{t('English')}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.getStartedButton} onPress={onGetStarted}>
        <Text style={styles.getStartedText}>{t('Get Started')}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate(SCREENS.LoginScreen)}>
        <Text style={styles.signInText}>
          {t('Already have an account?')}{' '}
          <Text style={styles.signInLink}>{t('Sign In')}</Text>
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default GetStarted;

const styles = StyleSheet.create({
  logo: {
    width: 356,
    height: 124,
    resizeMode: 'contain',
    marginBottom: 100,
  },
  imageStyle: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  title: {
    ...commonFontStyle('i_800', 27, colors.black),
    marginBottom: 7,
    textTransform: 'uppercase',
    // letterSpacing: 1,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 100,
    ...commonFontStyle('i_500', 20, colors.black),
    // marginHorizontal: 20
  },
  languageContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 30,
    justifyContent: 'space-between',
  },
  languageButton: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  getStartedButton: {
    backgroundColor: colors.themeColor,
    // paddingHorizontal: 90,
    borderRadius: 10,
    marginBottom: 30,
    width: '100%',
    alignItems: 'center',
    height: 57,
    justifyContent: 'center',
  },
  getStartedText: {
    ...commonFontStyle('i_500', 18, colors.white),
  },
  lanText: {
    ...commonFontStyle('i_500', 18, colors.black),
  },
  signInText: {
    ...commonFontStyle('i_500', 18, colors.black),
  },
  signInLink: {
    color: colors._EDAA3C,
    fontWeight: 'bold',
  },
});
