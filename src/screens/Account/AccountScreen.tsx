import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {AppStyles} from '../../theme/appStyles';
import CustomHeader from '../../component/common/CustomHeader';
import {IMAGES} from '../../assets/Images';
import {useTranslation} from 'react-i18next';
import {commonFontStyle, hp, wp} from '../../theme/fonts';
import {colors} from '../../theme/colors';
import {navigateTo} from '../../utils/commonFunction';
import {SCREEN_NAMES} from '../../navigation/screenNames';

const data = [
  {
    title: 'Profile',
    icon: IMAGES?.profile,
    onPress: () => navigateTo(SCREEN_NAMES.Profile),
  },
  {
    title: 'Order History',
    icon: IMAGES.order_history,
  },
  {
    title: 'Addresses',
    icon: IMAGES.addresses,
  },
  {
    title: 'Offers',
    icon: IMAGES.offers,
  },
  {
    title: 'Feedback',
    icon: IMAGES.feedback,
  },
  {
    title: 'Language',
    icon: IMAGES.language,
  },
  {
    title: 'Privacy Policy',
    icon: IMAGES.privacypolicy,
  },
  {
    title: 'Terms & Conditions',
    icon: IMAGES.terms_conditions,
  },
];

const AccountScreen = () => {
  const {t} = useTranslation();
  return (
    <SafeAreaView style={AppStyles.mainWhiteContainer}>
      <CustomHeader isSetting={true} title={t('Account')} />
      <View style={styles.listContainer}>
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.itemseparator} />}
          contentContainerStyle={styles.flatlistContainer}
          renderItem={({item, index}) => (
            <TouchableOpacity onPress={item?.onPress} style={styles.list}>
              <View style={styles.left}>
                <Image style={styles.icon} source={item?.icon} />
                <Text style={styles.title}>{item?.title}</Text>
              </View>
              <Image source={IMAGES.right_arrow} style={styles.right} />
            </TouchableOpacity>
          )}
          ListFooterComponent={
            <View style={styles.footer}>
              <View style={styles.socialcontainer}>
                <Image style={styles.social} source={IMAGES.fb} />
                <Image style={styles.social} source={IMAGES.insta} />
                <Image style={styles.social} source={IMAGES.x} />
                <Image style={styles.social} source={IMAGES.in} />
              </View>
              <Text style={styles.version}>{'App Version: 0.1'}</Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  listContainer: {
    marginTop: hp(18),
    flex: 1,
  },
  list: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp(20),
    paddingLeft: wp(30),
    paddingRight: wp(20),
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(12),
  },
  icon: {
    width: wp(30),
    height: wp(30),
    resizeMode: 'contain',
  },
  right: {
    width: wp(21),
    height: wp(21),
  },
  title: {
    ...commonFontStyle('i_400', 20, colors.black),
  },
  itemseparator: {
    height: 1,
    backgroundColor: colors._E1E1E180,
  },
  flatlistContainer: {
    borderTopWidth: 1,
    borderColor: colors._E1E1E180,
  },
  social: {
    width: wp(50),
    height: wp(50),
  },
  socialcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(42),
    marginTop: hp(36),
  },
  footer: {
    borderTopWidth: 1,
    borderColor: colors._E1E1E180,
  },
  version: {
    ...commonFontStyle('i_400', 20, colors._8C8C8C),
    textAlign: 'center',
    marginTop: hp(23),
  },
});
