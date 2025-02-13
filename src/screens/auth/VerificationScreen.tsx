import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
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
import {commonFontStyle} from '../../theme/fonts';
import {useTranslation} from 'react-i18next';
import {SCREENS} from '../../navigation/screenNames';
// import Icon from 'react-native-vector-icons/Feather';

const CELL_COUNT = 4;

const VerificationScreen = ({navigation}) => {
  const {t} = useTranslation();

  const [code, setCode] = useState('');
  const ref = useBlurOnFulfill({value: code, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });

  const handleVerify = () => {
    navigation.navigate(SCREENS.HomeScreen);
    // if (code.length === 4) {
    //   Alert.alert('Success', `Entered OTP: ${code}`);
    //   // Implement verification logic
    // } else {
    //   Alert.alert('Error', 'Please enter a valid 4-digit code.');
    // }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      {/* Back Button */}
      <View style={styles.backButton}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={IMAGES.back}
            style={{
              width: 37,
              height: 37,
              elevation: 30,
              borderWidth: 0.1,
              borderRadius: 10,
            }}
          />
        </TouchableOpacity>
        <Text style={styles.backText}>{t('Verification Code')}</Text>
      </View>

      {/* Title and Phone Number */}
      <Text style={styles.title}>{t('Verification code sent')}</Text>
      <Text style={styles.subtitle}>{t('Enter 6-digit code sent at')}</Text>
      <Text style={styles.phoneNumber}>+961 254 2578 255</Text>

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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor,
    // alignItems: 'center',
    paddingHorizontal: 20,
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
