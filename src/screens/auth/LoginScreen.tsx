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
import {
  emailCheck,
  errorToast,
  navigateTo,
  resetNavigation,
} from '../../utils/commonFunction';
import {
  onAppleSignInCall,
  onGoogleSignInCall,
  onLoginCall,
  onSendOTPCall,
} from '../../redux/service/AuthServices';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {WEB_CLIENT_ID} from '../../utils/apiConstant';
import appleAuth from '@invertase/react-native-apple-authentication';
import {setAuthorization} from '../../utils/apiGlobal';
import {setAsyncToken} from '../../utils/asyncStorage';
import SocialLoginButton from '../../component/common/SocialLoginButton';

const LoginScreen = ({}) => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const {language, fcmToken} = useAppSelector(state => state.common);

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

  const onGoogleButtonPress = async () => {
    GoogleSignin.configure({webClientId: WEB_CLIENT_ID});
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const {data}: any = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(
        data?.idToken,
      );
      await auth().signInWithCredential(googleCredential);
      const {data: userInfo} = await GoogleSignin.signInSilently();

      let obj = {
        data: {
          name: userInfo?.user.name,
          email: userInfo?.user.email,
          googleId: userInfo?.user?.id,
          deviceToken: fcmToken,
        },
        onSuccess: async (res: any) => {
          await setAuthorization(res?.data?.auth_token);
          await setAsyncToken(res?.data?.auth_token);
          resetNavigation(SCREENS.HomeScreen);
        },
        onFailure: (res: any) => {
          // console.log('onFailure', res);
          // if (res?.data?.phone_verified === false) {
          //   navigateTo(SCREENS.EnterPhoneScreen, {
          //     registerData: obj.data,
          //     type: 'google',
          //   });
          // }
        },
      };
      dispatch(onGoogleSignInCall(obj));
    } catch (error: any) {
      console.log(error);
    }
  };

  const onAppleButtonPress = async () => {
    // Start the sign-in request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });
    // Ensure Apple returned a user identityToken
    if (!appleAuthRequestResponse.identityToken) {
      throw new Error('Apple Sign-In failed - no identify token returned');
    }

    // Create a Firebase credential from the response
    const {identityToken, nonce} = appleAuthRequestResponse;
    if (identityToken) {
      const appleCredential = auth.AppleAuthProvider.credential(
        identityToken,
        nonce,
      );

      auth()
        .signInWithCredential(appleCredential)
        .then(async user => {
          console.log('user', user);
          var str: any = user.user.email;
          str = str.split('@');
          let data: any = {};
          data.email = user.user.email;
          data.name = str[0];
          data.appleId = user.user.uid;
          data.deviceToken = fcmToken;

          let obj = {
            data: data,
            onSuccess: async (res: any) => {
              await setAuthorization(res?.data?.auth_token);
              await setAsyncToken(res?.data?.auth_token);
              resetNavigation(SCREENS.HomeScreen);
            },
            onFailure: (res: any) => {
              // console.log('onFailure', res);
              // if (res?.data?.phone_verified === false) {
              //   navigateTo(SCREENS.EnterPhoneScreen, {
              //     registerData: obj.data,
              //     type: 'google',
              //   });
              // }
            },
          };
          dispatch(onAppleSignInCall(obj));

          // navigateTo(SCREENS.EnterPhoneScreen, {
          //   registerData: data,
          //   type: 'apple',
          // });
        })
        .catch(error => {
          console.log('error', error);
          // Something goes wrong
        });
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
          {Platform.OS === 'ios' && (
            <SocialLoginButton
              icon={IMAGES.apple}
              title={t('Sign in with Apple')}
              onPress={onAppleButtonPress}
            />
          )}
          <SocialLoginButton
            icon={IMAGES.google}
            title={t('Sign in with Google')}
            onPress={onGoogleButtonPress}
          />
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
    alignItems: 'center',
    marginVertical: 20,
    gap: 10,
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
