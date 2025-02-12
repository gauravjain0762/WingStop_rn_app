import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
} from 'react-native';
import {IMAGES} from '../../assets/Images';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {commonFontStyle} from '../../theme/fonts';
import {colors} from '../../theme/colors';
import CustomButton from '../../component/common/CustomButton';
import {SCREENS} from '../../navigation/screenNames';

const LoginScreen = ({navigation}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const {language} = useSelector(state => state.common);
  const [userID, setUserID] = useState('');

  const handleLogin = () => {
    console.log('Logging in with:', userID);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Logo */}
      <Image source={IMAGES.logo} style={styles.logo} />

      {/* Input Field */}
      <Text style={styles.label}>{t('Mobile Number/User ID')}</Text>
      <TextInput
        style={styles.input}
        placeholder={t('Enter here...')}
        placeholderTextColor="#999"
        value={userID}
        onChangeText={setUserID}
        keyboardType="numeric"
      />

      {/* Login Button */}
      <CustomButton
        onPress={handleLogin}
        title={t('Login')}
        extraStyle={{marginTop: 35}}
      />

      {/* Forgot Password */}
      <Text style={styles.forgotPassword}>{t('Forget password')}</Text>

      {/* Social Login Buttons */}
      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <Image source={IMAGES.apple} style={styles.imageStyle} />
          <Text style={styles.socialText}>{t('Sign in with Apple')}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton}>
          <Image source={IMAGES.google} style={styles.imageStyle} />
          <Text style={styles.socialText}>{t('Sign in with Google')}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate(SCREENS.SignUpScreen)}>
        <Text style={styles.signInText}>
          {t('Create a New account?')}{' '}
          <Text style={styles.signInLink}>{t('Sign up')}</Text>
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.bgColor,
    paddingHorizontal: 20,
  },
  logo: {
    width: 206,
    height: 71,
    resizeMode: 'contain',
    marginVertical: 80,
  },
  imageStyle: {
    width: 18,
    height: 20,
    resizeMode: 'contain',
  },
  label: {
    marginBottom: 16,
    alignSelf: 'flex-start',
    ...commonFontStyle('600', 22, colors.black),
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 15,
    ...commonFontStyle('i_500', 16, colors.black),
  },
  loginButton: {
    backgroundColor: colors.themeColor,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    height: 57,
    justifyContent: 'center',
    marginTop: 35,
  },
  loginText: {
    ...commonFontStyle('i_500', 18, colors.white),
  },
  forgotPassword: {
    marginTop: 14,
    ...commonFontStyle('400', 18, colors._686868),
  },
  socialContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.black,
    borderRadius: 10,
    marginHorizontal: 5,
    marginTop: 26,
    paddingVertical: 16,
    flex: 1,
    justifyContent: 'center',
  },
  socialText: {
    marginLeft: 8,
    ...commonFontStyle('i_500', 14, colors.black),
  },
  signInText: {
    ...commonFontStyle('i_500', 18, colors.black),
  },
  signInLink: {
    color: colors._EDAA3C,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
