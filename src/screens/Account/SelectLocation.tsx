import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {colors} from '../../theme/colors';
import MapView, {Marker} from 'react-native-maps';
import {GOOGLE_MAP_API_KEY} from '../../utils/apiConstant';
import {useNavigation, useRoute} from '@react-navigation/native';
import {commonFontStyle, hp, wp} from '../../theme/fonts';
import {IMAGES} from '../../assets/Images';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {getAddress} from '../../utils/locationHandler';
import {useAppDispatch} from '../../redux/hooks';
import {
  addAddressApi,
  getUserAddressApi,
  updateAddressApi,
} from '../../redux/service/AddressServices';
import {errorToast, goBack} from '../../utils/commonFunction';
import {useTranslation} from 'react-i18next';
import {rowReverseRTL, textRTL} from '../../utils/arabicStyles';
import CustomButton from '../../component/common/CustomButton';
import Input from '../../component/common/Input';
import {AppStyles} from '../../theme/appStyles';

const SelectLocation = () => {
  const mapRef = useRef<any>(null);
  const [select, setSelect] = useState('Home');
  const {params}: any = useRoute();
  const [input, setInput] = useState('');
  const [area, setArea] = useState('');
  const [formatted_address, setFormatted_address] = useState('');
  const dispatch = useAppDispatch();
  const {t, i18n} = useTranslation();
  const [mapLoading, setMapLoading] = useState(false);
  const [position, setPosition] = useState<any>(undefined);
  const styles = useMemo(() => {
    return globalStyles(i18n.language);
  }, [i18n.language]);

  let list = [
    {
      id: 1,
      name: 'Home',
      picture: IMAGES.home,
    },
    {
      id: 2,
      name: 'Work',
      picture: IMAGES.work,
    },
    {
      id: 3,
      name: 'Friends House',
      picture: IMAGES.frd_home,
    },
    {
      id: 4,
      name: 'Hospital',
      picture: IMAGES.hospital,
    },
  ];

  useEffect(() => {
    setMapLoading(true);
    if (params && params?.codes) {
      setPosition(params.codes);
      mapRef?.current?.animateToRegion(params.codes);
      getAddress(
        {...params?.codes},
        (res: any) => {
          setMapLoading(false);
          setFormatted_address(res?.results?.[0]?.formatted_address);
          setArea(res?.results?.[0].address_components?.[1]?.long_name);
        },
        () => {},
      );
    }
  }, [params]);

  const onSubmit = () => {
    if (!formatted_address) {
      getAddress(
        {...params?.codes},
        (res: any) => {
          setMapLoading(false);
          setFormatted_address(res?.results?.[0]?.formatted_address);
          setArea(res?.results?.[0].address_components?.[1]?.long_name);
        },
        () => {},
      );
    } else if (input.trim() == '') {
      errorToast(t('Please enter address details'));
    } else {
      let data: any = {
        type: select,
        villa_apt_no: input,
        lat: position?.latitude,
        lng: position?.longitude,
        address: formatted_address,
        area: area,
      };
      if (params && params?.isUpdate) {
        data.is_default = params?.address?.is_default;
        data.address_id = params?.address?._id;
        let obj = {
          data: data,
          onSuccess: (_res: any) => {
            goBack();
          },
          onFailure: () => {},
        };
        dispatch(updateAddressApi(obj));
      } else {
        data.is_default = true;
        let obj = {
          data: data,
          onSuccess: (_res: any) => {
            dispatch(
              getUserAddressApi({
                onSuccess: () => {
                  goBack();
                },
              }),
            );
          },
          onFailure: () => {},
        };
        dispatch(addAddressApi(obj));
      }
    }
  };

  return (
    <SafeAreaView style={AppStyles.mainWhiteContainer}>
      <View style={styles.container}>
        {position && (
          <MapView
            ref={mapRef}
            // provider={PROVIDER_GOOGLE}
            loadingEnabled={mapLoading}
            key={GOOGLE_MAP_API_KEY}
            region={{
              latitude: position.latitude,
              longitude: position.longitude,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
            // scrollEnabled={false}
            style={styles.mapStyle}>
            <Marker
              coordinate={{
                latitude: position.latitude,
                longitude: position.longitude,
              }}>
              <Image source={IMAGES.marker1} style={styles.marker1} />
            </Marker>
          </MapView>
        )}
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          {formatted_address && (
            <View style={styles.location}>
              <Text style={styles.labels}>{t('Delivering to')}</Text>
              <Text style={styles.address}>{area}</Text>
              <Text style={styles.labels}>{formatted_address}</Text>
            </View>
          )}
          <View style={styles.location}>
            <Text style={styles.address}>{t('Address Details')}*</Text>
            <Text style={styles.addressDetails}>
              {t('Your address details will be given to rider.')}*
            </Text>
            <Input
              placeholder={t('Ex: villa - apartment number')}
              value={input}
              placeholderColor={colors._7A7A7A}
              onChangeText={setInput}
              style={styles.inputStyle}
            />
          </View>
          <View style={styles.serviceContainer}>
            {list?.map(item => (
              <View key={item?.id} style={styles.serviceBtn}>
                <TouchableOpacity
                  onPress={() => setSelect(item?.name)}
                  style={{
                    ...styles.img,
                    backgroundColor:
                      item.name === select ? colors.themeColor : colors.white,
                  }}>
                  <Image
                    source={item?.picture}
                    resizeMode="cover"
                    style={{
                      ...styles.serviceimage,
                      tintColor:
                        item.name === select ? colors.white : colors.black,
                    }}
                  />
                </TouchableOpacity>
                <Text style={styles.servicename}>{t(item?.name)}</Text>
              </View>
            ))}
          </View>
          <CustomButton
            onPress={() => onSubmit()}
            extraStyle={styles.btn}
            title={t('Save and Continue')}
          />
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SelectLocation;

const globalStyles = (language: any) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
    },
    mapStyle: {
      width: '100%',
      height: hp(226),
    },
    labels: {
      ...commonFontStyle(500, 18, colors._7A7A7A),
      ...textRTL(language),
    },
    address: {
      ...commonFontStyle(500, 20, colors.black),
      lineHeight: 26,
      ...textRTL(language),
    },
    location: {
      gap: hp(10),
      paddingHorizontal: wp(26),
      paddingVertical: hp(24),
      borderBottomWidth: 1,
      borderBottomColor: colors._DFDFDF,
    },
    btn: {
      marginVertical: hp(28),
      marginHorizontal: wp(20),
    },
    serviceimage: {
      width: wp(25),
      height: wp(25),
    },
    serviceBtn: {
      justifyContent: 'center',
      alignItems: 'center',
      gap: wp(10),
      flex: 1,
    },
    serviceContainer: {
      ...rowReverseRTL(language),
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      paddingHorizontal: wp(26),
      marginTop: hp(20),
    },
    img: {
      width: wp(55),
      height: wp(55),
      borderWidth: 1,
      borderColor: colors._E8EFEB,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 100,
    },
    servicename: {
      ...commonFontStyle(400, 15, colors.black),
      textAlign: 'center',
    },
    addressDetails: {
      ...commonFontStyle(500, 17, colors._7A7A7A),
      ...textRTL(language),
    },
    inputStyle: {
      marginTop: hp(16),
      ...commonFontStyle(500, 18, colors._7A7A7A),
    },
    marker1: {
      width: wp(60),
      height: wp(71),
    },
  });
};
