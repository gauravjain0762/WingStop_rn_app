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
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CountryPicker from 'react-native-country-picker-modal';
import {SCREENS} from '../../navigation/screenNames';
import {emailCheck, errorToast, navigateTo} from '../../utils/commonFunction';
import {onRegisterCall} from '../../redux/service/AuthServices';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';

const SignUpScreen = ({}) => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const {language} = useAppSelector(state => state.common);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState({
    cca2: 'AE',
    currency: ['AED'],
    callingCode: ['971'],
    region: 'Asia',
    subregion: 'Western Asia',
    flag: 'flag-ae',
    name: 'United Arab Emirates',
  });
  const [visible, setVisible] = useState(false);
  const handleLogin = () => {
    if (!fullName.trim()) {
      errorToast(t('Enter a full name'));
      return;
    }
    if (!email.trim()) {
      errorToast(t('Enter a Email'));
      return;
    }
    if (!emailCheck(email.toLocaleLowerCase())) {
      errorToast(t('Enter a valid email'));
      return;
    }
    if (!phone.trim()) {
      errorToast(t('Enter a phone number'));
      return;
    }
    if (phone.length < 9 || phone.length > 12) {
      errorToast(t('Enter a valid phone number'));
      return;
    }
    if (!age.trim()) {
      errorToast(t('Enter a age'));
      return;
    }
    if (!password.trim()) {
      errorToast(t('Enter a password'));
      return;
    }
    if (password.length < 6) {
      errorToast(t('Password must be at least 6 characters'));
      return;
    }

    const obj = {
      data: {
        name: fullName,
        email: email.toLocaleLowerCase(),
        phone: country.callingCode[0] + phone,
        age: age,
        password: password,
        deviceType: Platform.OS,
        deviceToken: '',
        language: language,
      },
      onSuccess: (res: any) => {
        navigateTo(SCREENS.VerificationScreen, {
          user_id: res?.data?._id,
          phone: country.callingCode[0] + phone,
        });
      },
      onFailure: () => {},
    };
    dispatch(onRegisterCall(obj));
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={'handled'}
        showsVerticalScrollIndicator={false}
        style={[{flex: 1, marginHorizontal: wp(20)}]}>
        {/* Logo */}
        <Image source={IMAGES.logo} style={styles.logo} />

        <Text style={styles.label}>{t('Full Name')}</Text>
        <TextInput
          style={styles.input}
          placeholder={t('Enter Full Name')}
          value={fullName}
          onChangeText={setFullName}
        />

        <Text style={styles.label}>{t('Email')}</Text>
        <TextInput
          style={styles.input}
          placeholder={t('Enter Email')}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>{t('UAE Mobile Number')}</Text>
        <View
          style={[styles.input, {flexDirection: 'row', alignItems: 'center'}]}>
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}
            onPress={() => {
              setVisible(true);
            }}>
            <Image
              source={{
                uri: `https://flagcdn.com/w320/${country?.cca2.toLowerCase()}.png`,
              }}
              style={styles.imageStyle1}
            />
            <Text style={styles.codeText}>+971</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.input1}
            placeholder={t('Phone Number')}
            keyboardType="phone-pad"
            value={phone}
            maxLength={9}
            onChangeText={setPhone}
          />
        </View>

        <Text style={styles.label}>{t('Age')}</Text>
        <TextInput
          style={styles.input}
          placeholder={t('Enter Age')}
          keyboardType="numeric"
          value={age}
          onChangeText={setAge}
        />

        <Text style={styles.label}>{t('Password')}</Text>
        <TextInput
          style={styles.input}
          placeholder={t('Enter Password')}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {/* Login Button */}
        <CustomButton
          onPress={handleLogin}
          title={t('Registration')}
          extraStyle={{marginTop: 35}}
        />

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
          style={{alignSelf: 'center'}}
          onPress={() => navigateTo(SCREENS.LoginScreen)}>
          <Text style={styles.signInText}>
            {t('Already have an account?')}{' '}
            <Text style={styles.signInLink}>{t('Sign In')}</Text>
          </Text>
        </TouchableOpacity>
        <View style={{height: 20}} />
        {visible && (
          <CountryPicker
            visible={visible}
            withFlag
            withFilter
            withCallingCode
            onSelect={(i: any) => {
              setCountry(i);
              setVisible(false);
            }}
            onClose={() => setVisible(false)}
          />
        )}
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
    marginTop: 70,
    marginBottom: 45,
    alignSelf: 'center',
  },
  imageStyle: {
    width: 18,
    height: 20,
    resizeMode: 'contain',
  },
  imageStyle1: {
    width: 35,
    height: 35,
    resizeMode: 'stretch',
    borderRadius: 35,
  },
  label: {
    marginBottom: 16,
    alignSelf: 'flex-start',
    ...commonFontStyle('600', 18, colors.black),
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 15,
    ...commonFontStyle('i_500', 16, colors.black),
    marginBottom: 20,
  },
  input1: {
    ...commonFontStyle('i_500', 16, colors.black),
    flex: 1,
  },
  codeText: {
    ...commonFontStyle('i_500', 16, colors.black),
    marginHorizontal: 20,
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

export default SignUpScreen;
