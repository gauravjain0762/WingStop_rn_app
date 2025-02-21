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
import {IMAGES} from '../../assets/Images';
import {navigateTo} from '../../utils/commonFunction';
import {SCREEN_NAMES} from '../../navigation/screenNames';
import {commonFontStyle, hp, wp} from '../../theme/fonts';
import {colors} from '../../theme/colors';

let data = [
  {
    name: 'DIP ‘N’ WING',
    description: 'Sed ut perspiciatis unde omnis iste natus.',
    image: IMAGES.promotion1,
  },
  {
    name: 'HOT LEMON COMBO',
    description: 'Sed ut perspiciatis unde omnis iste natus.',
    image: IMAGES.promotion2,
  },
  {
    name: 'DIP ‘N’ WING',
    description: 'Sed ut perspiciatis unde omnis iste natus.',
    image: IMAGES.promotion3,
  },
];

const PromotionScreen = () => {
  const {t} = useTranslation();
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
      <View style={styles.list}>
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.itemsepator} />}
          contentContainerStyle={styles.container}
          renderItem={({item, index}) => (
            <TouchableOpacity
              onPress={() =>
                navigateTo(SCREEN_NAMES.PromotionDetails, {...item})
              }
              style={styles.card}>
              <View style={styles.cardcontainer}>
                <Image source={item.image} style={styles.image} />
                <View style={styles.bottom}>
                  <Text style={styles.item}>{item?.name}</Text>
                  <Text style={styles.description}>{item?.description}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default PromotionScreen;

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
  },
  item: {
    ...commonFontStyle('i_600', 20, colors.black),
  },
  description: {
    ...commonFontStyle('i_400', 18, colors._797878),
  },
  bottom: {
    backgroundColor: colors.white,
    gap: wp(4),
    paddingHorizontal: wp(20),
    paddingVertical: hp(18),
  },
  card: {
    borderRadius: 20,
    shadowColor: colors.black,
    shadowRadius: 20,
    shadowOpacity: 0.1,
    backgroundColor: colors.white,
  },
  container: {
    paddingHorizontal: hp(21),
    paddingTop: hp(30),
  },
  list: {
    flex: 1,
  },
  itemsepator: {
    height: hp(20),
  },
  cardcontainer: {borderRadius: 20, overflow: 'hidden'},
});
