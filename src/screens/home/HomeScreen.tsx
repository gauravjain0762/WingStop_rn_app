/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {IMAGES} from '../../assets/Images';
import {colors} from '../../theme/colors';
import {AppStyles} from '../../theme/appStyles';
import {commonFontStyle, SCREEN_WIDTH, wp} from '../../theme/fonts';
import {useTranslation} from 'react-i18next';
import {SCREENS, SCREEN_NAMES} from '../../navigation/screenNames';
import {navigateTo} from '../../utils/commonFunction';
import {useAppDispatch} from '../../redux/hooks';
import {onGetDashboard} from '../../redux/service/HomeServices';

type Props = {};

const specialOffers = [
  {
    uri: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    uri: 'https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];

const CustomTabBar = ({setSelectedTab}: any) => {
  return (
    <View style={styles.tabMain}>
      <TouchableOpacity onPress={() => setSelectedTab('Home')}>
        <Image source={IMAGES.home} style={[styles.iconTab]} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigateTo(SCREENS.MyOrdersScreen);
          setSelectedTab('Cart');
        }}>
        <Image source={IMAGES.list} style={[styles.iconTab]} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigateTo(SCREENS.CartScreen);
          setSelectedTab('Profile');
        }}>
        <Image source={IMAGES.addCart} style={[styles.iconTab]} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigateTo(SCREENS.AccountScreen);
          setSelectedTab('Profile');
        }}>
        <Image source={IMAGES.usetTab} style={[styles.iconTab]} />
      </TouchableOpacity>
    </View>
  );
};

const HomeScreen = ({}: Props) => {
  const {t} = useTranslation();

  const dispatch = useAppDispatch();
  const [isDelivery, setIsDelivery] = useState(true);
  const [selectedTab, setSelectedTab] = useState('Home');
  const [categories, setCategories] = useState([]);
  const [bannerList, setBannerList] = useState([]);

  useEffect(() => {
    getDashboard();
  }, []);

  const getDashboard = () => {
    let obj = {
      onSuccess: (_res: any) => {
        const cat = _res?.data?.categories;
        const banner = _res?.data?.banners;
        setBannerList(banner);
        setCategories(cat);
      },
      onFailure: (_res: any) => {},
    };
    dispatch(onGetDashboard(obj));
  };

  return (
    <SafeAreaView style={[AppStyles.mainWhiteContainer]}>
      {/* Header */}
      <View style={[styles.container1, AppStyles.mainSide]}>
        <View style={styles.leftContainer}>
          <Image
            source={{uri: 'https://i.pravatar.cc/100'}}
            style={styles.profileImage}
          />
          <View style={styles.addressContainer}>
            <Text style={styles.grayText}>{t('Deliver to')}</Text>
            <View style={styles.locationContainer}>
              <Text style={styles.boldText}>{t('Time Square')}</Text>
              <Image source={IMAGES.downIC} style={styles.downIcon} />
            </View>
          </View>
        </View>
        <View style={styles.rightContainer}>
          <TouchableOpacity
            onPress={() => navigateTo(SCREEN_NAMES.Notification)}>
            <Image
              source={IMAGES.notification}
              style={[styles.iconStyle3, {marginRight: 15}]}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigateTo(SCREEN_NAMES.SearchScreen)}>
            <Image source={IMAGES.search} style={styles.iconStyle3} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Delivery / Pickup Toggle */}
      <View style={[styles.toggleContainer, {marginHorizontal: wp(20)}]}>
        <TouchableOpacity
          style={[styles.toggleButton, isDelivery && styles.activeButton]}
          onPress={() => setIsDelivery(true)}>
          <Image
            source={IMAGES.Delivery}
            style={[
              styles.iconStyle4,
              {tintColor: isDelivery ? 'white' : '#959595'},
            ]}
          />
          <Text
            style={[
              styles.toggleText,
              {color: isDelivery ? 'white' : '#959595'},
            ]}>
            {t('Delivery')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.toggleButton, !isDelivery && styles.activeButton]}
          onPress={() => setIsDelivery(false)}>
          <Image
            source={IMAGES.Pickup}
            style={[
              styles.iconStyle4,
              {tintColor: !isDelivery ? 'white' : '#959595'},
            ]}
          />
          <Text
            style={[
              styles.toggleText,
              {color: !isDelivery ? 'white' : '#959595'},
            ]}>
            {t('Pick up')}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        {/* Banner */}

        <FlatList
          data={bannerList}
          contentContainerStyle={styles.bannerContainer}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}: any) => (
            <Image
              source={{uri: item?.image}}
              style={styles.bannerStyle}
              key={index}
            />
          )}
        />
        <View style={{top: -10}}>
          <ImageBackground
            source={IMAGES.bg1}
            resizeMode="contain"
            style={{
              width: '100%',
              height: 139,
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            <Text style={styles.text1}>{t('Estimated delivery time')}</Text>
            <Text style={styles.text2}>20:00 - 20:20</Text>
            <TouchableOpacity style={styles.orderButton}>
              <Text style={styles.orderButtonText}>{t('View Detail')}</Text>
            </TouchableOpacity>
          </ImageBackground>
        </View>
        {/* Categories */}
        <View style={[styles.container, AppStyles.mainSide, {top: -30}]}>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Text style={styles.title}>{t('Menu Categories')}</Text>
              <Image source={IMAGES.MenuCategories} style={styles.menuIcon} />
            </View>
            <TouchableOpacity
              onPress={() => {
                navigateTo(SCREENS.ViewAllScreen);
              }}
              style={styles.headerRight}>
              <Text style={styles.title1}>{t('View All')}</Text>
              <Image source={IMAGES.rightside} style={styles.arrowIcon} />
            </TouchableOpacity>
          </View>

          <FlatList
            data={categories}
            numColumns={4}
            keyExtractor={(item: any) => item._id}
            contentContainerStyle={styles.listContainer}
            columnWrapperStyle={styles.columnWrapper}
            renderItem={({item}: any) => (
              <View style={styles.categoryItem}>
                <View style={styles.outerBox}>
                  <View style={styles.innerBox}>
                    <Image
                      source={{uri: item?.image}}
                      style={styles.categoryImage}
                    />
                  </View>
                </View>
                <Text style={styles.categoryText}>{item?.title}</Text>
              </View>
            )}
          />
        </View>
        {/* Special Offers */}
        <View style={[AppStyles.mainSide, {top: -30}]}>
          <Text style={[styles.title, {marginVertical: 20}]}>
            {t('Special Offers')}
          </Text>
          <FlatList
            data={specialOffers}
            horizontal
            keyExtractor={(_, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
            // contentContainerStyle={styles.listContainer1}
            renderItem={({item}) => (
              <View style={[styles.offerCard, {backgroundColor: colors.white}]}>
                <Image source={item} style={styles.offerImage} />
              </View>
            )}
          />
          <View style={{height: 100}} />
        </View>
      </ScrollView>

      <View
        style={{
          position: 'absolute',
          bottom: 20,
          width: '90%',
          alignSelf: 'center',
        }}>
        <CustomTabBar
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  iconStyle: {
    width: 44,
    height: 44,
    resizeMode: 'contain',
    marginRight: 15,
  },
  iconStyle1: {
    width: 44,
    height: 44,
    resizeMode: 'contain',
  },
  iconStyle2: {
    width: 34,
    height: 30,
    resizeMode: 'contain',
  },
  iconTab: {
    width: 27,
    height: 27,
    resizeMode: 'contain',
  },
  tabMain: {
    flexDirection: 'row',
    backgroundColor: '#14532D',
    paddingVertical: 20,
    justifyContent: 'space-around',
    borderRadius: 50,
    elevation: 30,
  },

  container1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // paddingHorizontal: 16,
    paddingVertical: 10,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  addressContainer: {
    marginLeft: 10,
  },
  grayText: {
    ...commonFontStyle('i_500', 17, colors._949494),
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  boldText: {
    ...commonFontStyle('i_600', 20, colors._010101),
    marginTop: 3,
  },
  text1: {
    ...commonFontStyle('i_600', 18, colors.black),
    marginLeft: 40,
  },
  text2: {
    ...commonFontStyle('i_400', 18, colors.black),
    marginLeft: 40,
    marginTop: 6,
  },
  downIcon: {
    width: 16,
    height: 14,
    resizeMode: 'contain',
    marginLeft: 8,
  },
  rightContainer: {
    flexDirection: 'row',
  },
  iconStyle3: {
    width: 44,
    height: 44,
    resizeMode: 'contain',
  },

  toggleContainer: {
    flexDirection: 'row',
    marginVertical: 15,
    backgroundColor: '#F1F1F1',
    borderRadius: 20,
    padding: 5,
  },
  toggleButton: {
    flex: 1,
    padding: 7,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  activeButton: {
    backgroundColor: colors.themeColor,
  },
  iconStyle4: {
    width: 34,
    height: 28,
    resizeMode: 'contain',
  },
  toggleText: {
    textAlign: 'center',
    marginLeft: 7,
    ...commonFontStyle('i_500', 16, colors.white),
  },
  bannerContainer: {
    flexGrow: 1,
    gap: 20,
    paddingHorizontal: 20,
  },
  bannerStyle: {
    width: SCREEN_WIDTH / 1.2,
    height: 170,
    borderRadius: 30,
    resizeMode: 'stretch',
    alignSelf: 'center',
    overflow: 'hidden',
  },

  container: {marginTop: 8},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginBottom: 2,
  },
  title: {
    marginVertical: 10,
    ...commonFontStyle('i_500', 17, colors.black),
  },
  title1: {
    ...commonFontStyle('i_500', 15, colors.black),
  },
  menuIcon: {
    width: 55,
    height: 40,
    resizeMode: 'contain',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    marginLeft: 10,
  },
  listContainer: {
    gap: 14,
  },
  columnWrapper: {
    gap: 4,
  },
  categoryItem: {
    alignItems: 'center',
    flex: 1,
  },
  outerBox: {
    width: 90,
    height: 90,
    backgroundColor: colors._F0F0F0,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerBox: {
    width: 71,
    height: 71,
    backgroundColor: colors.white,
    borderRadius: 71,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  categoryText: {
    marginTop: 5,
    textAlign: 'center',
    ...commonFontStyle('i_600', 15, colors.black),
  },

  offerCard: {
    borderRadius: 20,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    shadowColor: '#000',
    // shadowOffset: {width: 0, height: 0},
    // shadowOpacity: 0.4,
    // shadowRadius: 5,
    // elevation: 5, // For Android shadow
  },
  offerImage: {
    width: 168,
    height: 142,
    borderRadius: 20,
  },

  orderButton: {
    backgroundColor: colors.themeColor,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 40,
    alignSelf: 'flex-end',
    right: 49,
    position: 'absolute',
    marginTop: 26,
  },
  orderButtonText: {
    ...commonFontStyle('i_500', 10, colors.white),
  },
});
