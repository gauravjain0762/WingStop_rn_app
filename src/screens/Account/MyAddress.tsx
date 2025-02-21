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
import {useTranslation} from 'react-i18next';
import {commonFontStyle, hp, wp} from '../../theme/fonts';
import {colors} from '../../theme/colors';
import {IMAGES} from '../../assets/Images';
import CustomButton from '../../component/common/CustomButton';

let data = [
  {
    type: 'Home',
    location: 'Al Karim Building dubai internet city dubai',
    default: true,
  },
  {
    type: 'Office',
    location: 'Al Adeel market near Al noor bank road dubai',
  },
  {
    type: 'Hospital',
    location: 'Zaid bin salman hospital jamil bin road dubai',
  },
  {
    type: 'Shop',
    location: 'Dubai mall apple store #25 shop no dubai',
  },
  {
    type: 'Others',
    location: 'costa east cafe near JLT lake view dubai',
  },
];

const MyAddress = () => {
  const {t} = useTranslation();
  return (
    <SafeAreaView style={AppStyles.mainWhiteContainer}>
      <CustomHeader isIcon={false} title={t('My Address')} />
      <FlatList
        data={data}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.container}
        ListFooterComponent={
          <View style={styles.btncontainer}>
            <CustomButton
              extraStyle={styles.btn}
              title={t('Add New Address')}
            />
          </View>
        }
        renderItem={({item, index}) => (
          <View style={styles.list}>
            <View style={styles.locationrow}>
              <Text style={styles.type}>
                {item?.type}{' '}
                <Text style={styles.default}>
                  {item?.default && '(Primary)'}
                </Text>
              </Text>
              <View>
                <Text style={styles.location}>{item?.location}</Text>
              </View>
            </View>
            <TouchableOpacity hitSlop={20}>
              <Image source={IMAGES.more} style={styles.more} />
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default MyAddress;

const styles = StyleSheet.create({
  locationrow: {
    gap: wp(15),
    flex: 1,
  },
  type: {
    ...commonFontStyle('i_600', 20, colors._1C5F36),
  },
  location: {
    ...commonFontStyle('400', 18, colors._8F8F8F),
  },
  more: {
    width: wp(4),
    height: wp(17),
    resizeMode: 'contain',
  },
  list: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(21),
    paddingVertical: hp(33),
  },
  separator: {
    height: hp(1),
    backgroundColor: colors._E1E1E180,
  },
  container: {
    borderTopWidth: 1,
    borderColor: colors._E1E1E180,
  },
  btn: {
    marginHorizontal: wp(21),
    width: 'auto',
  },
  btncontainer: {
    borderTopWidth: 1,
    borderColor: colors._E1E1E180,
    paddingVertical: hp(30),
  },
  default: {
    ...commonFontStyle('400', 17, colors.black),
  },
});
