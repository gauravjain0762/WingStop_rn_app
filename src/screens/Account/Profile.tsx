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

let data = [
  {
    title: '+971 26 531 5487',
    icon: IMAGES.phone,
  },
  {
    title: 'Age: 20-25',
    icon: IMAGES.age,
  },
  {
    title: 'Change Password',
    icon: IMAGES.password,
  },
  {
    title: 'Logout',
    icon: IMAGES.logout,
  },
  {
    title: 'Delete Account',
    icon: IMAGES.delete,
  },
];

const Profile = () => {
  const {t} = useTranslation();
  return (
    <SafeAreaView style={AppStyles.mainWhiteContainer}>
      <CustomHeader isSetting={true} title={t('Profile')} />
      <View style={styles.container}>
        <View style={styles.info}>
          <Image source={IMAGES.user2} style={styles.user} />
          <View>
            <Text style={styles.name}>{'Baki Fernandos'}</Text>
            <Text style={styles.email}>{'baki@fernandos.com'}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>{'Edit Your Profile'}</Text>
          <Image style={styles.edit} source={IMAGES.edit} />
        </TouchableOpacity>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={data}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.itemseparator} />}
          contentContainerStyle={styles.flatlistContainer}
          renderItem={({item, index}) => (
            <TouchableOpacity style={styles.list}>
              <View style={styles.left}>
                <Image style={styles.icon} source={item?.icon} />
                <Text
                  style={
                    item?.title == 'Delete Account'
                      ? styles.delete
                      : styles.title
                  }>
                  {item?.title}
                </Text>
              </View>
              <Image source={IMAGES.right_arrow} style={styles.right} />
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    marginHorizontal: wp(21),
    borderRadius: 25,
    shadowColor: colors.black,
    paddingTop: hp(20),
    paddingBottom: hp(30),
    paddingHorizontal: wp(34),
    shadowRadius: 20,
    shadowOpacity: 0.1,
    marginTop: hp(40),
  },
  name: {
    ...commonFontStyle('600', 22, colors.black),
  },
  user: {
    width: wp(76),
    height: wp(76),
    resizeMode: 'contain',
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(20),
  },
  email: {
    ...commonFontStyle('500', 20, colors._676767),
    marginTop: hp(5),
  },
  edit: {
    width: wp(18),
    height: wp(18),
  },
  btn: {
    backgroundColor: colors._D5FFE7,
    borderRadius: 100,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(14),
    justifyContent: 'center',
    gap: wp(8),
    borderWidth: 1,
    borderColor: colors._97E7B6,
    marginTop: hp(12),
  },
  btnText: {
    ...commonFontStyle('i_500', 18, colors._1C5F36),
  },
  listContainer: {
    marginTop: hp(18),
    flex: 1,
  },
  list: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp(24),
    paddingLeft: wp(30),
    paddingRight: wp(20),
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(17),
  },
  icon: {
    width: wp(27),
    height: wp(27),
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
    borderBottomWidth: 1,
    marginTop: wp(30),
  },
  delete: {
    ...commonFontStyle('i_400', 20, colors._BD1113),
  },
});
