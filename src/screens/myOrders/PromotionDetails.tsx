import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {AppStyles} from '../../theme/appStyles';
import CustomHeader from '../../component/common/CustomHeader';
import {useTranslation} from 'react-i18next';
import {navigateTo} from '../../utils/commonFunction';
import {SCREEN_NAMES} from '../../navigation/screenNames';
import {IMAGES} from '../../assets/Images';
import {commonFontStyle, hp, wp} from '../../theme/fonts';
import {useRoute} from '@react-navigation/native';
import {colors} from '../../theme/colors';
import CustomButton from '../../component/common/CustomButton';

const PromotionDetails = () => {
  const {t} = useTranslation();
  const {params} = useRoute();
  const {name, image} = params;
  return (
    <SafeAreaView style={AppStyles.mainWhiteContainer}>
      <CustomHeader
        title={t('Promotions')}
        right={
          <View style={styles.rightContainer}>
            <TouchableOpacity
              onPress={() => navigateTo(SCREEN_NAMES.SearchScreen)}>
              <Image
                source={IMAGES.search}
                style={[styles.iconStyle3, {marginRight: 15}]}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigateTo(SCREEN_NAMES.Notification)}>
              <Image source={IMAGES.notification} style={styles.iconStyle3} />
            </TouchableOpacity>
          </View>
        }
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={image} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.limited}>{'Limited Time!'}</Text>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.description}>
            {
              'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque lauda ntium, totam rem aperiam, eaque ipsa'
            }
          </Text>
          <Text style={styles.policytitle}>{'Policy & Conditions'}</Text>
          <View style={styles.listcontainer}>
            {[
              'Sed ut perspiciatis unde omnis',
              'Fugiat quo voluptas nulla pariatur',
              'Sed quia consequuntur magni dolores eos',
              'Sed quia consequuntur magni dolores eos ab illo inventore veritatis et quasi arch.',
            ]?.map((item: any) => (
              <View style={styles.policylist}>
                <Image source={IMAGES.check} style={styles.check} />
                <View style={{flex: 1}}>
                  <Text style={styles.policy}>{item}</Text>
                </View>
              </View>
            ))}
          </View>
          <CustomButton
            extraStyle={styles.btn}
            rightIcon={IMAGES.copy}
            extraTextStyle={styles.btntitle}
            title={'Redeem Now'}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PromotionDetails;

const styles = StyleSheet.create({
  rightContainer: {
    flexDirection: 'row',
  },
  iconStyle3: {
    width: wp(44),
    height: wp(44),
    resizeMode: 'contain',
  },
  image: {
    width: '100%',
    height: hp(194),
    resizeMode: 'cover',
    borderRadius: 20,
    paddingHorizontal: wp(21),
    marginTop: hp(30),
  },
  limited: {
    ...commonFontStyle('i_500', 20, colors._D79424),
    marginTop: hp(26),
  },
  name: {
    ...commonFontStyle('i_700', 30, colors.black),
    marginTop: hp(8),
  },
  info: {
    paddingHorizontal: wp(21),
  },
  description: {
    ...commonFontStyle('i_500', 18, colors._5D5D5D),
    marginTop: hp(14),
  },
  policytitle: {
    ...commonFontStyle('i_600', 22, colors.black),
    marginTop: hp(30),
  },
  check: {
    width: wp(25),
    height: wp(25),
    resizeMode: 'contain',
  },
  policy: {
    ...commonFontStyle('i_500', 18, colors._5D5D5D),
  },
  policylist: {
    flexDirection: 'row',
    gap: wp(14),
  },
  listcontainer: {
    gap: hp(20),
    marginTop: hp(25),
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(16),
    marginTop: hp(50),
    marginBottom: hp(20),
    height: hp(72),
    borderRadius: 12,
  },
  btntitle: {
    ...commonFontStyle('i_700', 22, colors.white),
  },
});
