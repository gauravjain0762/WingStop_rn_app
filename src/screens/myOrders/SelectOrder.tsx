import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {AppStyles} from '../../theme/appStyles';
import CustomHeader from '../../component/common/CustomHeader';
import {useTranslation} from 'react-i18next';
import {IMAGES} from '../../assets/Images';
import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  commonFontStyle,
  hp,
  wp,
} from '../../theme/fonts';
import {colors} from '../../theme/colors';
import TabBar from '../../component/common/TabBar';
import MapView, {Marker} from 'react-native-maps';
import commonReducer from '../../redux/reducer/commonReducer';

const initialRegion = {
  latitude: 25.078, // Example latitude (Dubai)
  longitude: 55.1888, // Example longitude
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

const SelectOrder = () => {
  const {t} = useTranslation();

  const AddressList = () => {
    return (
      <View style={styles.addresslist}>
        <Image style={styles.minimap} source={IMAGES.map} />
        <View style={styles.addressinfo}>
          <View style={styles.header}>
            <View
              style={{
                flex: 1,
              }}>
              <Text style={styles.shop}>
                {t('Wingstop :')}
                <Text style={styles.location}>{' Dubai Internet City'}</Text>
              </Text>
            </View>
            <TouchableOpacity style={styles.openbtn}>
              <Text style={styles.open}>{t('Open')}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.infolist}>
            <View style={styles.iconcontainer}>
              <Image style={styles.icons} source={IMAGES.marker2} />
              <Text style={styles.listvalue}>{'2.5 km '}</Text>
            </View>
            <View style={styles.iconcontainer}>
              <Image style={styles.icons} source={IMAGES.phone1} />
              <Text style={styles.listvalue}>{'+971 65 829 4120'}</Text>
            </View>
          </View>
          <View style={styles.infolist}>
            <View style={styles.iconcontainer}>
              <Image style={styles.icons} source={IMAGES.clock} />
              <Text style={styles.listvalue}>{'11:00 AM - 1:30 AM'}</Text>
            </View>
            <View style={styles.iconcontainer}>
              <Text style={styles.direction}>{'Get Directions'}</Text>
              <Image style={styles.icons} source={IMAGES.direction} />
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={AppStyles.mainWhiteContainer}>
      <CustomHeader isIcon={false} title={t('Select Order Type')} />
      {/* Toggle Buttons */}
      <TabBar />
      <View style={styles.mapView}>
        <MapView initialRegion={initialRegion} style={styles.map}>
          <Marker
            style={{
              shadowColor: colors.black,
              shadowRadius: 25,
              shadowOpacity: 0.5,
              backgroundColor: 'transparent',
            }}
            // image={IMAGES.marker1}
            coordinate={initialRegion}>
            <Image source={IMAGES.marker1} style={styles.marker1} />
          </Marker>
        </MapView>
        <View style={styles.upper}>
          <View style={styles.pickupbar}>
            <Image source={IMAGES.marker} style={styles.marker} />
            <View style={styles.right}>
              <Text style={styles.pickupLabel}>{t('Pick Up Order')}</Text>
              <Text style={styles.nobranch}>{t('No branch picked')}</Text>
            </View>
          </View>
        </View>
        <View style={styles.bottom}>
          <Image source={IMAGES.right_arrow} style={styles.upArrow} />
          <ScrollView style={{paddingHorizontal: wp(26)}}>
            <AddressList />
            <AddressList />
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SelectOrder;

const styles = StyleSheet.create({
  mapView: {
    marginTop: hp(22),
    borderTopWidth: 1,
    borderColor: colors._DFDFDF,
    flex: 1,
  },
  map: {
    width: '100%',
    flex: 1,
  },
  marker: {
    width: wp(30),
    height: wp(30),
    resizeMode: 'contain',
  },
  pickupbar: {
    flexDirection: 'row',
    alignItems: 'center',
    top: hp(20),
    paddingHorizontal: wp(23),
    paddingVertical: hp(20),
    gap: wp(18),
    borderRadius: 10,
    alignSelf: 'center',
    flexGrow: 1,
    width: '100%',
    backgroundColor: colors.white,
  },
  right: {},
  pickupLabel: {
    ...commonFontStyle('i_600', 18, colors.black),
  },
  nobranch: {
    ...commonFontStyle('i_400', 16, colors._6D6D6D),
  },
  upper: {
    paddingHorizontal: wp(21),
    position: 'absolute',
    width: '100%',
  },
  marker1: {
    width: wp(60),
    height: wp(71),
  },
  bottom: {
    borderTopStartRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: colors.white,
    position: 'absolute',
    width: '100%',
    bottom: 0,
    maxHeight: hp(250),
  },
  minimap: {
    width: wp(55),
    height: wp(55),
  },
  mapContainer: {
    justifyContent: 'space-between',
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 111,
    // flex: 1,
  },
  upArrow: {
    width: wp(30),
    height: wp(30),
    transform: [{rotate: '270deg'}],
    alignSelf: 'center',
  },
  addresslist: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(15),
    flex: 1,
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowRadius: 20,
    shadowOpacity: 0.05,
    borderRadius: 20,
    paddingHorizontal: wp(16),
    paddingVertical: hp(16),
    marginTop: hp(20),
  },
  openbtn: {
    backgroundColor: 'rgba(51, 150, 89, 0.1)',
    borderRadius: 5,
    // flex: 1,
  },
  open: {
    ...commonFontStyle('i_600', 12, colors._1D5F36),
    paddingVertical: hp(6),
    paddingHorizontal: wp(10),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    gap: wp(2),
  },
  shop: {
    ...commonFontStyle('i_600', 16, colors._414141),
  },
  location: {
    ...commonFontStyle('i_400', 16, colors._414141),
  },
  addressinfo: {
    flex: 1,
  },
  listvalue: {
    ...commonFontStyle('i_400', 15, colors._6D6D6D),
  },
  infolist: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(4),
    flex: 1,
    flexWrap: 'wrap',
    marginBottom: hp(8),
    gap: wp(10),
  },
  icons: {
    width: wp(18),
    height: wp(18),
    resizeMode: 'contain',
  },
  direction: {
    ...commonFontStyle('i_500', 14, colors._1D5F36),
  },
  iconcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(11),
  },
});
