import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {AppStyles} from '../../theme/appStyles';
import {IMAGES} from '../../assets/Images';
import {commonFontStyle, hp, wp} from '../../theme/fonts';
import {colors} from '../../theme/colors';
import commonReducer from '../../redux/reducer/commonReducer';
import CustomHeader from '../../component/common/CustomHeader';
import {useTranslation} from 'react-i18next';

let data = [
  {
    title: 'Orders Cancelled!',
    time: '19 Dec, 2022  I  20:50 PM',
    description:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudan.',
    read: false,
    icon: IMAGES.cancelled,
  },
  {
    title: 'Orders Sucessful!',
    time: '19 Dec, 2022  I  20:50 PM',
    description:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudan.',
    read: false,
    icon: IMAGES.order,
  },
  {
    title: 'New Services Available',
    time: '19 Dec, 2022  I  20:50 PM',
    description:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudan.',
    read: true,
    icon: IMAGES.service,
  },
  {
    title: 'Credit Card Connected',
    time: '19 Dec, 2022  I  20:50 PM',
    description:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudan.',
    read: true,
    icon: IMAGES.credit,
  },
  {
    title: 'Account Setup Successful!',
    time: '19 Dec, 2022  I  20:50 PM',
    description:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudan.',
    read: true,
    icon: IMAGES.account,
  },
];

const Notification = () => {
  const {t} = useTranslation();
  return (
    <SafeAreaView style={AppStyles.mainWhiteContainer}>
      <CustomHeader isIcon={false} title={t('Notification')} />
      <View style={styles.notilist}>
        <FlatList
          data={data}
          ItemSeparatorComponent={() => <View style={styles.itemseparator} />}
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => <View style={styles.header} />}
          renderItem={({item, index}) => (
            <View>
              <View style={styles.mainline}>
                <View style={styles.list}>
                  <Image style={styles.icon} source={item?.icon} />
                  <View style={styles.titlelist}>
                    <View>
                      <Text style={styles.title}>{item?.title}</Text>
                    </View>
                    <Text style={styles.time}>{item?.time}</Text>
                  </View>
                </View>
                {!item?.read && (
                  <View style={styles.badge}>
                    <Text style={styles.badgetext}>{'New'}</Text>
                  </View>
                )}
              </View>
              <Text style={styles.description}>{item?.description}</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default Notification;

const styles = StyleSheet.create({
  icon: {width: wp(67), height: wp(67), resizeMode: 'contain'},
  list: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(16),
    flex: 1,
  },
  description: {
    ...commonFontStyle('i_400', 16, colors._5F5F5F),
    marginTop: hp(10),
  },
  title: {
    ...commonFontStyle('i_600', 19, colors.black),
  },
  time: {
    ...commonFontStyle('i_500', 14, colors._8C8C8C),
  },
  titlelist: {
    gap: wp(11),
    flex: 1,
  },
  container: {
    paddingHorizontal: wp(21),
  },
  notilist: {
    flex: 1,
  },
  header: {
    height: hp(60),
  },
  itemseparator: {
    height: hp(40),
  },
  badge: {
    backgroundColor: colors._1C5F36,
    borderRadius: 9,
  },
  mainline: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  badgetext: {
    ...commonFontStyle('i_500', 12, colors.white),
    paddingVertical: hp(7),
    paddingHorizontal: wp(11),
  },
});
