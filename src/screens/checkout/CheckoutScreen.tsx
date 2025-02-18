import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TextInput,
  Switch,
} from 'react-native';
import {IconButton} from 'react-native-paper';
import {commonFontStyle, wp} from '../../theme/fonts';
import {colors} from '../../theme/colors';
import {IMAGES} from '../../assets/Images';
import {AppStyles} from '../../theme/appStyles';
import {useTranslation} from 'react-i18next';
import MapView, {Marker} from 'react-native-maps';
import {navigationRef} from '../../navigation/RootContainer';
import OrderSuccessModal from '../../component/common/OrderSuccessModal';

const initialRegion = {
  latitude: 25.078, // Example latitude (Dubai)
  longitude: 55.1888, // Example longitude
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};
const CheckoutScreen = () => {
  const {t} = useTranslation();
  const [selectedMethod, setSelectedMethod] = useState('cod');
  const [modalVisible, setModalVisible] = useState(false);

  const paymentOptions = [
    {id: 'cod', label: t('Cash on Delivery'), icon: IMAGES.pay},
    {id: 'card', label: 'xxxx-2568', icon: ''},
    {id: 'applepay', label: t('Apple Pay'), icon: IMAGES.apple},
  ];

  const orderItems = [
    {name: 'Game Night Bundle', price: 25},
    {name: 'Hot Lemon Combo', price: 25},
  ];

  const subtotal = orderItems.reduce((sum, item) => sum + item.price, 0);
  const deliveryFee = 5;
  const platformFee = 5;
  const vat = 2;
  const promoDiscount = 5;
  const total = subtotal + deliveryFee + platformFee + vat - promoDiscount;

  return (
    <SafeAreaView style={[AppStyles.flex]}>
      <StatusBar barStyle={'dark-content'} backgroundColor={colors.white} />
      {/* Header */}
      <View style={[styles.header, AppStyles.mainSide]}>
        <TouchableOpacity onPress={() => navigationRef.goBack()}>
          <Image
            source={IMAGES.back1}
            style={{
              width: 30,
              height: 30,
            }}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>{t('Checkout')}</Text>
      </View>
      <ScrollView>
        <View
          style={{
            marginHorizontal: wp(20),
            borderRadius: 10,
            overflow: 'hidden',
          }}>
          <MapView style={styles.map} initialRegion={initialRegion}>
            <Marker coordinate={initialRegion}>
              <Image
                source={IMAGES.location}
                style={styles.incidentIconStyle1}
              />
            </Marker>
          </MapView>
        </View>

        {/* Address Card */}
        <View style={styles.card}>
          <View>
            <Text style={styles.homeText}>{t('Home')}</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.addressText}>
              Villa #22, Emirates Hills Dubai
            </Text>
            <TouchableOpacity>
              <Text style={styles.changeText}>{t('Change')}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Add New Address Button */}
        <TouchableOpacity style={styles.addAddressButton}>
          <View style={styles.plusView}>
            <Image source={IMAGES.plush} style={{width: 15, height: 15}} />
          </View>
          <Text style={styles.addAddressText}>{t('Add New Address')}</Text>
        </TouchableOpacity>

        <Text style={styles.title}>{t('Payment Method')}</Text>
        <View style={styles.card1}>
          {paymentOptions.map((option, index) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.option,
                {borderTopWidth: index == 0 ? 0 : 1, borderTopColor: '#ccc'},
              ]}
              onPress={() => setSelectedMethod(option.id)}>
              <Image
                source={option?.icon}
                style={{
                  width: 24,
                  height: 24,
                  resizeMode: 'contain',
                  // tintColor:
                  //   selectedMethod === option.id ? colors.themeColor : '#666',
                }}
              />

              <Text
                style={[
                  styles.optionText,
                  selectedMethod === option.id && styles.selectedText,
                ]}>
                {option.label}
              </Text>

              <Image
                source={
                  selectedMethod === option.id
                    ? IMAGES.checkIn
                    : IMAGES.checkOut
                }
                style={{
                  width: 25,
                  height: 25,
                  resizeMode: 'contain',
                  marginTop: 4,
                }}
              />
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity style={styles.addCard}>
          <View style={[styles.plusView, {backgroundColor: colors.white}]}>
            <Image source={IMAGES.plush} style={{width: 15, height: 15}} />
          </View>
          <Text style={styles.addCardText}>{t('Add New Card')}</Text>
        </TouchableOpacity>

        <View style={[styles.divider, {marginVertical: 20}]} />
        <Text style={[styles.header1, AppStyles.mainSide]}>
          {t('Order Summary')}
        </Text>

        {orderItems.map((item, index) => (
          <View key={index} style={styles.itemRow}>
            <Text style={styles.itemText}>{item.name}</Text>
            <Text style={styles.itemText}>AED {item.price.toFixed(2)}</Text>
          </View>
        ))}

        <View style={[styles.divider, {marginTop: 20}]} />

        <View style={styles.summaryRow}>
          <Text style={styles.label}>{t('Subtotal')}</Text>
          <Text style={styles.label1}>AED {subtotal.toFixed(2)}</Text>
        </View>
        <View style={[styles.divider]} />
        <View style={styles.summaryRow}>
          <Text style={styles.label}>{t('Delivery Fee')}</Text>
          <Text style={styles.label1}>AED {deliveryFee.toFixed(2)}</Text>
        </View>
        <View style={[styles.divider]} />
        <View style={styles.summaryRow}>
          <Text style={styles.label}>{t('Platform Fee')}</Text>
          <Text style={styles.label1}>AED {platformFee.toFixed(2)}</Text>
        </View>
        <View style={[styles.divider]} />
        <View style={styles.summaryRow}>
          <Text style={styles.label}>{t('VAT')}</Text>
          <Text style={styles.label1}>AED {vat.toFixed(2)}</Text>
        </View>
        <View style={[styles.divider]} />
        <View style={styles.summaryRow}>
          <Text style={styles.label}>{t('Promo Code Discount')}</Text>
          <Text style={styles.label1}>- AED {promoDiscount.toFixed(2)}</Text>
        </View>

        <View style={styles.divider} />
        <Text style={styles.teamsText}>
          {t('by completing this order, I agree to all')}
          <Text style={{color: colors.themeColor}}>
            {' '}
            {t('terms & conditions')}.
          </Text>
        </Text>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>
            {t('Total')}{' '}
            <Text style={styles.totalLabel1}>({t('incl. VAT')})</Text>
          </Text>
          <Text style={styles.totalPrice}>AED {total.toFixed(2)}</Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setModalVisible(true);
          }}>
          <Text style={styles.buttonText}>{t('Place Order')}</Text>
        </TouchableOpacity>
      </ScrollView>

      <OrderSuccessModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerText: {
    marginLeft: 10,
    ...commonFontStyle('i_600', 22, colors.black),
  },

  map: {
    height: 200,
    width: '100%',
    borderRadius: 10,
    marginHorizontal: wp(20),
    alignSelf: 'center',
  },
  card: {
    padding: 15,
    margin: 10,
    borderRadius: 10,
    paddingHorizontal: wp(20),
  },
  homeText: {
    ...commonFontStyle('500', 19, colors.themeColor),
    marginBottom: 10,
  },
  addressText: {
    flex: 1,
    ...commonFontStyle('500', 19, colors.black),
  },
  changeText: {
    ...commonFontStyle('500', 16, colors.themeColor),
  },
  addAddressButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingHorizontal: wp(20),
    paddingVertical: 14,
    borderTopColor: '#ccc',
    borderBottomColor: '#ccc',
  },
  addAddressText: {
    marginLeft: 16,
    ...commonFontStyle('500', 19, colors.themeColor),
  },
  plusView: {
    width: 32,
    height: 32,
    borderRadius: 32,
    backgroundColor: colors._E8EFEB,
    justifyContent: 'center',
    alignItems: 'center',
  },

  incidentIconStyle1: {
    height: wp(40),
    width: wp(40),
    resizeMode: 'contain',
  },

  title: {
    marginBottom: 18,
    marginHorizontal: wp(20),
    marginTop: 20,
    ...commonFontStyle('600', 22, colors.black),
  },
  card1: {
    backgroundColor: '#F8F8F8',
    marginHorizontal: wp(20),
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingVertical: 7,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  selectedOption: {backgroundColor: '#E8F5E9'},
  optionText: {
    flex: 1,
    marginLeft: 13,
    ...commonFontStyle('500', 19, colors._7E7E7E),
    marginTop: 4,
  },
  selectedText: {color: colors.themeColor},
  addCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.themeColor,
    padding: 12,
    marginHorizontal: wp(20),
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  addCardText: {
    ...commonFontStyle('500', 19, colors.white),
    marginLeft: 10,
  },

  header1: {
    marginBottom: 20,
    ...commonFontStyle('700', 28, colors.black),
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    ...AppStyles.mainSide,
  },
  itemText: {
    ...commonFontStyle('500', 20, colors._252525),
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    paddingVertical: 12,
    ...AppStyles.mainSide,
  },
  label: {
    ...commonFontStyle('500', 20, colors._8C8C8C),
  },
  label1: {
    ...commonFontStyle('500', 20, colors._8C8C8C),
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    ...AppStyles.mainSide,
  },
  teamsText: {
    ...AppStyles.mainSide,
    marginVertical: 10,
    ...commonFontStyle('500', 21, colors._8C8C8C),
    lineHeight: 26,
  },
  totalLabel: {
    ...commonFontStyle('700', 25, colors.black),
  },
  totalLabel1: {
    ...commonFontStyle('400', 21, colors.black),
  },
  totalPrice: {
    ...commonFontStyle('700', 25, colors.black),
  },
  button: {
    backgroundColor: colors.themeColor,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
    marginHorizontal: wp(20),
    marginBottom: 20,
    height: 63,
    justifyContent: 'center',
  },
  buttonText: {
    ...commonFontStyle('600', 20, colors.white),
  },
});
