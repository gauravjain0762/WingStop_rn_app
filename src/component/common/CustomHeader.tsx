import React, {ReactNode, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
} from 'react-native';
import {IMAGES} from '../../assets/Images';
import {useTranslation} from 'react-i18next';
import {commonFontStyle, wp} from '../../theme/fonts';
import {colors} from '../../theme/colors';
import {AppStyles} from '../../theme/appStyles';
import {SCREENS, SCREEN_NAMES} from '../../navigation/screenNames';
import {goBack, navigateTo} from '../../utils/commonFunction';
// import Icon from 'react-native-vector-icons/Feather';

const categories = [
  {id: '1', name: 'Promotions', icon: 'megaphone'},
  {id: '2', name: 'Burgers', icon: 'hamburger'},
  {id: '3', name: 'Individual...', icon: 'user'},
];

const CustomHeader = ({
  title,
  isSetting,
  isIcon = true,
  isSearch = false,
  placeholder = 'Enter text',
  right,
}: {
  title?: string;
  isSetting?: boolean;
  isIcon?: boolean;
  isSearch?: boolean;
  placeholder?: string;
  right?: ReactNode;
}) => {
  const [selectedCategory, setSelectedCategory] = useState('1');

  const {t} = useTranslation();

  return (
    <View style={[styles.container, AppStyles.mainSide]}>
      {/* Back Button */}
      <View
        style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
        <TouchableOpacity style={styles.btn} onPress={() => goBack()}>
          <Image
            source={IMAGES.back}
            style={{
              width: 37,
              height: 37,
            }}
          />
        </TouchableOpacity>
        {!isSearch && <Text style={styles.backText}>{title}</Text>}
        {isSearch ? (
          <TextInput
            placeholderTextColor={colors._6D6D6D}
            style={styles.input}
            placeholder={placeholder}
          />
        ) : (
          <View style={styles.rightContainer}>
            {right ? (
              right
            ) : (
              <>
                {isSetting && (
                  <TouchableOpacity>
                    <Image
                      source={IMAGES.setting}
                      style={[styles.iconStyle3]}
                    />
                  </TouchableOpacity>
                )}
                {isIcon && (
                  <>
                    <TouchableOpacity
                      onPress={() => navigateTo(SCREEN_NAMES.Notification)}>
                      <Image
                        source={IMAGES.notification}
                        style={[styles.iconStyle3, {marginRight: 15}]}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        navigateTo(SCREENS.CartScreen);
                      }}>
                      <Image
                        source={IMAGES.cardAdd}
                        style={styles.iconStyle3}
                      />
                    </TouchableOpacity>
                  </>
                )}
              </>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  backText: {
    marginLeft: 18,
    ...commonFontStyle('i_500', 18, colors.black),
    flex: 1,
  },
  iconStyle3: {
    width: 44,
    height: 44,
    resizeMode: 'contain',
  },
  rightContainer: {
    flexDirection: 'row',
  },
  btn: {
    backgroundColor: colors.bgColor,
    shadowColor: colors.black,
    shadowRadius: 20,
    shadowOpacity: 0.1,
    elevation: 10,
    borderRadius: 10,
  },
  input: {
    ...commonFontStyle('i_400', 16, colors.black),
    padding: wp(18),
    backgroundColor: colors.bgColor,
    flex: 1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors._E1E1E180,
    marginLeft: wp(19),
    shadowColor: colors.black,
    shadowRadius: 30,
    shadowOpacity: 0.06,
    elevation: 10,
  },
});

export default CustomHeader;
