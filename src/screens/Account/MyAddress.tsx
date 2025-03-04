/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AppStyles} from '../../theme/appStyles';
import CustomHeader from '../../component/common/CustomHeader';
import {useTranslation} from 'react-i18next';
import {commonFontStyle, hp, wp} from '../../theme/fonts';
import {colors} from '../../theme/colors';
import {IMAGES} from '../../assets/Images';
import CustomButton from '../../component/common/CustomButton';
import {navigateTo} from '../../utils/commonFunction';
import {SCREENS} from '../../navigation/screenNames';
import {requestLocationPermission} from '../../utils/locationHandler';
import {Loader} from '../../component';
import {setAsyncLocation} from '../../utils/asyncStorage';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {
  deleteAddressApi,
  getUserAddressApi,
  markDefaultAddressApi,
} from '../../redux/service/AddressServices';

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
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const {userAddressList, language} = useAppSelector(state => state.common);

  const [addressLits, setAddressLits] = useState([]);
  const [isSelected, setIsSelected] = useState<any>(null);

  useEffect(() => {
    setAddressLits(userAddressList);
    // getAddressList();
  }, [userAddressList]);

  const getAddressList = async () => {
    let obj = {
      onSuccess: (_res: any) => {},
    };
    dispatch(getUserAddressApi(obj));
  };

  const getLocation = async () => {
    setLoading(true);
    await requestLocationPermission(
      true,
      res => {
        setLoading(false);
        setAsyncLocation(res);
        navigateTo(SCREENS.SelectLocation, {
          codes: res,
        });
      },
      () => {
        setLoading(false);
      },
    );
  };

  const deleteAddress = () => {
    let obj = {
      data: {
        address_id: isSelected?._id,
        language: language,
      },
      onSuccess: (_res: any) => {
        setIsSelected(null);
      },
      onFailure: (_res: any) => {},
    };
    dispatch(deleteAddressApi(obj));
  };
  const onSetPrimary = () => {
    let obj = {
      data: {
        address_id: isSelected?._id,
      },
      onSuccess: (_res: any) => {
        setIsSelected(null);
      },
      onFailure: (_res: any) => {},
    };
    dispatch(markDefaultAddressApi(obj));
  };

  const TextView = ({
    title,
    onPress,
  }: {
    title: string;
    onPress?: () => void;
  }) => {
    return (
      <TouchableOpacity style={styles.textView} onPress={onPress}>
        <Text style={styles.titleText}>{title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={AppStyles.mainWhiteContainer}>
      <CustomHeader isIcon={false} title={t('My Address')} />
      <TouchableWithoutFeedback onPress={() => setIsSelected(null)}>
        <FlatList
          data={addressLits}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={{
            flexGrow: 1,
          }}
          style={styles.container}
          renderItem={({item}: any) => (
            <TouchableWithoutFeedback onPress={() => setIsSelected(null)}>
              <View style={styles.list}>
                <View style={styles.locationrow}>
                  <Text style={styles.type}>
                    {item?.type}{' '}
                    <Text style={styles.default}>
                      {item?.is_default && '(Primary)'}
                    </Text>
                  </Text>
                  <View>
                    <Text style={styles.location}>{item?.area}</Text>
                  </View>
                </View>
                <TouchableOpacity
                  hitSlop={20}
                  onPress={() => {
                    setIsSelected(item);
                  }}>
                  <Image source={IMAGES.more} style={styles.more} />
                </TouchableOpacity>
                {item?._id === isSelected?._id && (
                  <View style={styles.moreView}>
                    {/* <TextView title={t('Edit')} /> */}
                    <TextView title={t('Delete')} onPress={deleteAddress} />
                    <TextView
                      title={t('Set as Primary')}
                      onPress={onSetPrimary}
                    />
                  </View>
                )}
              </View>
            </TouchableWithoutFeedback>
          )}
          ListEmptyComponent={() => (
            <View style={styles.empty}>
              <Text style={styles.emptyText}>{t('No Address Found')}</Text>
            </View>
          )}
        />
      </TouchableWithoutFeedback>
      <CustomButton
        onPress={() => getLocation()}
        extraStyle={styles.btn}
        title={t('Add New Address')}
      />
      {loading && <Loader />}
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

  default: {
    ...commonFontStyle('400', 17, colors.black),
  },
  moreView: {
    backgroundColor: colors.white,
    padding: wp(10),
    borderRadius: wp(10),
    position: 'absolute',
    right: 20,
    top: 20,
  },
  textView: {
    paddingVertical: hp(10),
  },
  titleText: {
    ...commonFontStyle('400', 15, colors.black),
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    ...commonFontStyle('i_600', 22, colors.black),
  },
});
