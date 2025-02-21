import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {AppStyles} from '../../theme/appStyles';
import CustomHeader from '../../component/common/CustomHeader';
import {useTranslation} from 'react-i18next';
import {IMAGES} from '../../assets/Images';
import {commonFontStyle, hp, wp} from '../../theme/fonts';
import {colors} from '../../theme/colors';

const LoyalityScreen = () => {
  const {t} = useTranslation();

  return (
    <SafeAreaView style={AppStyles.mainWhiteContainer}>
      <CustomHeader isIcon={false} title={t('Loyality Points')} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.cardbg}>
          <ImageBackground
            resizeMode="stretch"
            source={IMAGES.cardBg}
            style={styles.card}>
            <View style={styles.left}>
              <Text style={styles.name}>{'Simgan Katrina'}</Text>
              <Text style={styles.point}>{'1024 Points'}</Text>
              <Text style={styles.click}>{'xxclick686'}</Text>
            </View>
            <Image source={IMAGES.logo} style={styles.logo} />
          </ImageBackground>
        </View>
        <View style={styles.bottomcard}>
          <ImageBackground
            source={IMAGES.cutcard}
            resizeMode="stretch"
            style={styles.cutcard}>
            <View style={styles.qr}>
              <Image source={IMAGES.qr} style={styles.qricon} />
            </View>
            <View style={styles.listcontainer}>
              <View style={styles.list}>
                <Image style={styles.ptc} source={IMAGES.pts} />
                <View style={{flex: 1}}>
                  <Text style={styles.title}>{'950 PTS'}</Text>
                  <View>
                    <Text style={styles.label}>{'Total available points'}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.list}>
                <Image style={styles.ptc} source={IMAGES.gift} />
                <View style={{flex: 1}}>
                  <Text style={styles.title}>{'500.00 AED'}</Text>
                  <View>
                    <Text style={styles.label}>
                      {'1 AED = 10 Loyalty Points'}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.footer}>
              <Text style={styles.footerTitle}>{'Learn About Points'}</Text>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.history}>
          <Text style={styles.historyLabel}>{'Point History'}</Text>
          <View style={styles.foodlist}>
            <Image style={styles.icon} source={IMAGES.food1} />
            <View style={styles.infocontainer}>
              <View>
                <Text style={styles.foodtitle}>{'Hot Lemon Combo'}</Text>
              </View>
              <Text style={styles.time}>{'01 Jan 2023  -  04:00 am '}</Text>
            </View>
            <Text style={styles.number}>{'-5'}</Text>
          </View>
          <View style={styles.foodlist}>
            <Image style={styles.icon} source={IMAGES.food2} />
            <View style={styles.infocontainer}>
              <View>
                <Text style={styles.foodtitle}>{'Game Night Bundle'}</Text>
              </View>
              <Text style={styles.time}>{'01 Jan 2023  -  04:00 am '}</Text>
            </View>
            <Text style={styles.number}>{'-5'}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoyalityScreen;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    paddingTop: hp(18),
  },
  logo: {
    width: wp(120),
    height: hp(42),
    tintColor: colors.white,
    paddingRight: wp(12),
  },
  name: {
    ...commonFontStyle('i_500', 25, colors.white),
    lineHeight: 30,
  },
  left: {
    flex: 1,
    paddingLeft: wp(22),
    paddingBottom: hp(40),
  },
  cardbg: {
    paddingHorizontal: wp(21),
    overflow: 'hidden',
    marginBottom: hp(25),
  },
  point: {
    ...commonFontStyle('700', 35, colors.white),
    lineHeight: 42,
    marginTop: hp(19),
  },
  click: {
    ...commonFontStyle('500', 22, colors.white),
  },
  cutcard: {
    justifyContent: 'space-between',
    shadowColor: colors.black,
    shadowRadius: 5,
    shadowOpacity: 0.08,
  },
  list: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors._E0E0E0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(20),
    backgroundColor: colors.white,
    paddingVertical: hp(10),
    paddingHorizontal: wp(20),
    shadowColor: colors.black,
    shadowRadius: 15,
    shadowOpacity: 0.08,
    marginBottom: hp(35),
  },
  ptc: {
    width: wp(56),
    height: wp(56),
  },
  title: {
    ...commonFontStyle('700', 22, colors.black),
    marginBottom: hp(5),
  },
  label: {
    ...commonFontStyle('i_400', 18, colors._6D6D6D),
  },
  listcontainer: {
    marginTop: hp(100),
    paddingHorizontal: wp(23),
  },
  footer: {
    backgroundColor: 'rgba(0, 105, 46, 0.1)',
    borderEndStartRadius: 20,
    borderEndEndRadius: 20,
    paddingVertical: hp(18),
    alignItems: 'center',
  },
  bottomcard: {
    paddingHorizontal: wp(20),
    marginTop: hp(50),
  },
  footerTitle: {
    ...commonFontStyle('i_600', 17, colors._1C5F36),
  },
  qr: {
    backgroundColor: colors._00692E,
    borderRadius: 100,
    alignSelf: 'center',
    padding: wp(17),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -hp(40),
  },
  qricon: {
    width: wp(70),
    height: wp(70),
    resizeMode: 'contain',
  },
  historyLabel: {
    ...commonFontStyle('600', 25, colors.black),
    marginTop: hp(34),
  },
  history: {
    paddingHorizontal: wp(24),
  },
  foodtitle: {
    ...commonFontStyle('600', 22, colors.black),
  },
  time: {
    ...commonFontStyle('500', 18, colors._949494),
  },
  infocontainer: {
    gap: hp(8),
    flex: 1,
  },
  icon: {
    width: wp(80),
    height: wp(83),
  },
  foodlist: {
    flexDirection: 'row',
    gap: wp(20),
    flex: 1,
    marginTop: hp(31),
  },
  number: {
    ...commonFontStyle('700', 18, colors._FF5A00),
  },
});
