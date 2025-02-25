/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  Platform,
} from 'react-native';
import {IMAGES} from '../../assets/Images';
import {useTranslation} from 'react-i18next';
import {commonFontStyle, wp} from '../../theme/fonts';
import {colors} from '../../theme/colors';
import CustomButton from '../../component/common/CustomButton';
import {SCREENS} from '../../navigation/screenNames';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {emailCheck, errorToast, navigateTo} from '../../utils/commonFunction';
import {onLoginCall, onSendOTPCall} from '../../redux/service/AuthServices';

const LoginScreen = ({}) => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const {language} = useAppSelector(state => state.common);

  const [userID, setUserID] = useState('');
  const [password, setPassword] = useState('');
  const [isEmail, setIsEmail] = useState(false);

  // Function to check if input is an email or mobile number
  const handleInputChange = (text: string) => {
    setUserID(text);
    const numberRegex = /^\d+$/;

    if (text.trim() === '') {
      setIsEmail(false); // Reset to default when input is cleared
    } else {
      setIsEmail(!numberRegex.test(text));
    }
  };

  const handleLoginWithEmail = () => {
    if (!emailCheck(userID)) {
      errorToast(t('Please enter a valid email'));
    } else if (password === '') {
      errorToast(t('Please enter password'));
    } else {
      const obj = {
        data: {
          email: userID.toLowerCase(),
          password: password,
          language: language,
          deviceToken: 'AJSKH908791ALKS676892832iJAS',
          deviceType: Platform.OS,
        },
        onSuccess: () => {},
        onFailure: (res: any) => {
          console.log('onFailure', res);
        },
      };
      dispatch(onLoginCall(obj));
    }
  };

  const handleLoginWithNumber = () => {
    if (userID === '') {
      errorToast(t('Please enter a mobile number or email'));
    } else {
      const obj = {
        data: {
          phone: userID,
          language: language,
        },
        onSuccess: (res: any) => {
          console.log('res', res);
          navigateTo(SCREENS.VerificationScreen, {
            user_id: res?.data?._id,
            phone: userID,
          });
        },
        onFailure: (res: any) => {
          console.log('onFailure', res);
        },
      };
      dispatch(onSendOTPCall(obj));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        style={{flex: 1, marginHorizontal: wp(20)}}>
        {/* Logo */}
        <Image source={IMAGES.logo} style={styles.logo} />

        {/* Input Field */}
        <Text style={styles.label}>{t('Mobile Number/User ID')}</Text>
        <TextInput
          style={styles.input}
          placeholder={t('Enter here...')}
          placeholderTextColor="#999"
          value={userID}
          onChangeText={handleInputChange}
          keyboardType={isEmail ? 'email-address' : 'numeric'}
        />

        {/* Conditional Rendering */}
        {isEmail && (
          <TextInput
            style={styles.input}
            placeholder={t('Enter Password')}
            placeholderTextColor="#999"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        )}

        <CustomButton
          onPress={() => {
            if (isEmail) {
              handleLoginWithEmail();
            } else {
              handleLoginWithNumber();
            }
          }}
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

        {/* Sign Up Link */}
        <TouchableOpacity
          style={{alignSelf: 'center'}}
          onPress={() => navigateTo(SCREENS.SignUpScreen)}>
          <Text style={styles.signInText}>
            {t('Create a New account?')}{' '}
            <Text style={styles.signInLink}>{t('Sign up')}</Text>
          </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor,
  },
  logo: {
    width: 206,
    height: 71,
    resizeMode: 'contain',
    marginVertical: 80,
    alignSelf: 'center',
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
    marginBottom: 10,
    ...commonFontStyle('i_500', 16, colors.black),
  },
  forgotPassword: {
    marginTop: 14,
    ...commonFontStyle('400', 18, colors._686868),
    alignSelf: 'center',
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
