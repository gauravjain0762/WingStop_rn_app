import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {colors} from '../../theme/colors';
import {IMAGES} from '../../assets/Images';
import {commonFontStyle, wp} from '../../theme/fonts';
import {useTranslation} from 'react-i18next';
import {AppStyles} from '../../theme/appStyles';
import {errorToast, goBack, resetNavigation} from '../../utils/commonFunction';
import {useAppDispatch} from '../../redux/hooks';
import {onVerifyOTPCall} from '../../redux/service/AuthServices';
import {SCREENS} from '../../navigation/screenNames';
import CustomHeader from '../../component/common/CustomHeader';

const CELL_COUNT = 4;

interface Props {
  route: any;
}

const VerificationScreen = ({route}: Props) => {
  const {user_id, phone} = route?.params;
  const {t} = useTranslation();
  const dispatch = useAppDispatch();

  const [code, setCode] = useState('');
  const ref = useBlurOnFulfill({value: code, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });

  const handleVerify = () => {
    if (code === '') {
      errorToast(t('Please enter OTP'));
    } else {
      const obj = {
        data: {
          otp: code,
          user_id: user_id,
        },
        onSuccess: (res: any) => {
          console.log('response', res);
          resetNavigation(SCREENS.HomeScreen);
        },
        onFailure: (res: any) => {
          console.log('response', res);
        },
      };
      dispatch(onVerifyOTPCall(obj));
    }
  };

  return (
    <SafeAreaView style={AppStyles.mainWhiteContainer}>
      <CustomHeader title={t('Verification Code')} isIcon={false} />
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{t('Verification code sent')}</Text>
        <Text style={styles.subtitle}>{t('Enter 4-digit code sent at')}</Text>
        <Text style={styles.phoneNumber}>+{phone}</Text>

        {/* OTP Input Field */}
        <CodeField
          ref={ref}
          {...props}
          value={code}
          onChangeText={setCode}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({index, symbol, isFocused}) => (
            <View
              key={index}
              style={[styles.cell, isFocused && styles.focusedCell]}
              onLayout={getCellOnLayoutHandler(index)}>
              <Text style={styles.cellText}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            </View>
          )}
        />

        {/* Resend Code */}
        <TouchableOpacity style={styles.resendButton}>
          <Text style={styles.resendText}>{t('Resend Code')}</Text>
        </TouchableOpacity>

        {/* Verify Button */}
        <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
          <Text style={styles.verifyText}>{t('Verify')}</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor,
    // alignItems: 'center',
    paddingHorizontal: wp(20),
    paddingTop: 40,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  backText: {
    marginLeft: 18,
    ...commonFontStyle('i_600', 18, colors.black),
  },
  title: {
    ...commonFontStyle('700', 31, colors.black),
    marginTop: 25,
  },
  subtitle: {
    ...commonFontStyle('500', 20, colors.black),
    marginTop: 16,
  },
  phoneNumber: {
    marginTop: 15,
    ...commonFontStyle('500', 22, '#1C5F36'),
  },
  codeFieldRoot: {
    marginVertical: 20,
    width: '80%',
    alignSelf: 'center',
  },
  cell: {
    width: 50,
    height: 50,
    borderBottomWidth: 3,
    borderColor: '#DADADA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  focusedCell: {
    borderColor: '#2E7D32',
  },
  cellText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  resendButton: {
    marginVertical: 10,
  },
  resendText: {
    alignSelf: 'center',
    ...commonFontStyle('500', 20, colors.black),
    marginVertical: 8,
  },
  verifyButton: {
    backgroundColor: '#2E7D32',
    paddingVertical: 17,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 5,
    width: 160,
    alignItems: 'center',
    alignSelf: 'center',
  },
  verifyText: {
    ...commonFontStyle('600', 20, colors.white),
  },
});

export default VerificationScreen;
