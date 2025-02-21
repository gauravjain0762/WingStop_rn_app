import {
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
import {commonFontStyle, hp, wp} from '../../theme/fonts';
import {colors} from '../../theme/colors';
import {useTranslation} from 'react-i18next';
import {IMAGES} from '../../assets/Images';

const SearchScreen = () => {
  const {t} = useTranslation();
  return (
    <SafeAreaView style={AppStyles.mainWhiteContainer}>
      <CustomHeader isSearch placeholder={'Search food, '} />
      <View style={styles.container}>
        <Text style={styles.label}>{t('Recent Searches')}</Text>
        <View style={styles.list}>
          {[
            'Night Bundle',
            'Hot Wings',
            'Group Meals',
            'Kids Meals Combo',
            'Promotions',
            'Individual Meal',
            'Extra Sauces',
            'Drinks',
          ]?.map((item: any) => (
            <TouchableOpacity style={styles.recents}>
              <Image source={IMAGES.recent} style={styles.recent} />
              <View>
                <Text>{item}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: hp(32),
    borderTopWidth: 1,
    borderColor: colors._E1E1E180,
  },
  label: {
    paddingLeft: wp(21),
    paddingTop: hp(40),
    ...commonFontStyle('i_600', 22, colors.black),
  },
  recent: {
    width: wp(19),
    height: wp(19),
  },
  recents: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(19),
    borderRadius: 50,
    borderWidth: 1,
    borderColor: colors._E0E0E0,
    paddingVertical: hp(18),
    paddingHorizontal: wp(24),
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: wp(15),
    rowGap: hp(18),
    paddingHorizontal: wp(21),
    marginTop: hp(34),
  },
});
