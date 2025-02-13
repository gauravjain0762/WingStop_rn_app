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
import {navigationRef} from '../../navigation/RootContainer';
import {IMAGES} from '../../assets/Images';
import {AppStyles} from '../../theme/appStyles';
import {useTranslation} from 'react-i18next';

const CartScreen = () => {
  const {t} = useTranslation();
  const [pickup, setPickup] = useState(true);
  const [redeemPoints, setRedeemPoints] = useState(false);

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Game Night Bundle',
      description: '1 x Ranch Dip + 1 x Fries\n1 x Diet Pepsi.',
      price: 25.0,
      quantity: 2,
      image:
        'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: 2,
      name: 'Hot Lemon Combo',
      description: '1 x Ranch Dip + 1 x Fries\n1 x Diet Pepsi.',
      price: 25.0,
      quantity: 2,
      image:
        'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
  ]);

  const updateQuantity = (id, change) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id
          ? {...item, quantity: Math.max(1, item.quantity + change)}
          : item,
      ),
    );
  };

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
        <Text style={styles.headerText}>{t('Cart')}</Text>
      </View>

      {/* Toggle Buttons */}
      <View style={[styles.toggleContainer, {marginHorizontal: wp(20)}]}>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            !pickup ? styles.activeToggle : styles.inactiveToggle,
          ]}
          onPress={() => setPickup(false)}>
          <Image
            source={IMAGES.Delivery}
            style={[
              styles.iconStyle4,
              {tintColor: !pickup ? 'white' : '#959595'},
            ]}
          />
          <Text style={[styles.toggleText, !pickup && styles.activeText]}>
            {t('Delivery')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.toggleButton,
            pickup ? styles.activeToggle : styles.inactiveToggle,
          ]}
          onPress={() => setPickup(true)}>
          <Image
            source={IMAGES.pick1}
            style={[
              styles.iconStyle5,
              {tintColor: pickup ? 'white' : '#959595'},
            ]}
          />
          <Text style={[styles.toggleText, pickup && styles.activeText]}>
            {t('Pick Up')}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Cart Items */}
      <ScrollView style={{marginTop: 20}}>
        {cartItems.map(item => (
          <>
            <View key={item.id} style={[styles.cartItem]}>
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDescription}>{item.description}</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.itemPrice}>
                    AED {item.price.toFixed(2)}
                  </Text>
                  <View>
                    <View style={styles.quantityContainer}>
                      <TouchableOpacity
                        // onPress={decreaseQuantity}
                        style={styles.button}>
                        <Text style={styles.buttonText}>−</Text>
                      </TouchableOpacity>
                      <Text style={styles.quantity}>{'1'}</Text>
                      <TouchableOpacity
                        // onPress={increaseQuantity}
                        style={styles.button1}>
                        <Text style={styles.buttonText}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 14,
                    gap: 7,
                  }}>
                  <Image
                    source={IMAGES.info}
                    style={{width: 29, height: 29, resizeMode: 'contain'}}
                  />
                  <Text style={styles.infoText}>
                    {t('Sed ut perspiciatis unde omnis')}
                  </Text>
                </View>
              </View>
              <Image source={{uri: item.image}} style={styles.cartImage} />
            </View>
          </>
        ))}

        <View style={[styles.discountSection, AppStyles.mainSide]}>
          <Text style={styles.sectionTitle}>Apply Discount</Text>
          <TouchableOpacity>
            <Text style={styles.viewOffers}>View Offers</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.inputContainer, AppStyles.mainSide]}>
          <View style={styles.input}>
            <TextInput style={styles.input1} placeholder="Enter code here" />
            <Image
              source={IMAGES.addnew}
              style={{width: 32, height: 22, resizeMode: 'contain'}}
            />
          </View>
          <TouchableOpacity style={styles.applyMainButton}>
            <Text style={styles.applyText}>Apply</Text>
          </TouchableOpacity>
        </View>

        <View style={{}}>
          <View style={[styles.summaryContainer, {marginTop: 12}]}>
            <Text style={styles.summaryTextBold}>Subtotal</Text>
            <Text style={styles.summaryTextBold}>AED 100.00</Text>
          </View>
          <View
            style={[
              styles.summaryContainer,
              {marginBottom: 18, marginTop: 20},
            ]}>
            <Text style={styles.summaryText}>Delivery Fee</Text>
            <Text style={styles.summaryText}>AED 5.00</Text>
          </View>
          <View style={[styles.summaryContainer, styles.lineStyle]}>
            <Text style={styles.summaryText}>VAT</Text>
            <Text style={styles.summaryText}>AED 2.00</Text>
          </View>
          <View style={[styles.summaryContainer, styles.lineStyle1]}>
            <Text style={styles.promoText}>
              Promo Code{' '}
              <Text style={{color: colors.themeColor}}>(Wing 50)</Text>
            </Text>
            <Text style={styles.promoText}>AED 5.00</Text>
          </View>

          <View style={styles.redeemSection}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                marginTop: 12,
                marginBottom: 8,
              }}>
              <Image
                source={IMAGES.addnew}
                style={{width: 32, height: 22, resizeMode: 'contain'}}
              />
              <Text style={styles.redeemText}>Redeem Points</Text>
            </View>
            <TouchableOpacity style={styles.rediaStyle}>
              <View style={styles.rediaStyle1} />
            </TouchableOpacity>
          </View>
          <Text style={styles.redeemInfo}>
            You have currently 100 points ={' '}
            <Text style={{color: colors.themeColor}}>AED 10.00</Text>
          </Text>

          <View style={[styles.totalContainer, styles.lineStyle]}>
            <Text style={styles.totalText}>
              Total <Text style={styles.totalText1}>(incl. VAT)</Text>
            </Text>
            <Text style={styles.totalText}>AED 117.00</Text>
          </View>

          <Text style={styles.DeliveryText}>Delivery Instructions</Text>
          <TextInput
            style={styles.instructionInput}
            placeholder="Write Instructions"
            multiline
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.addItemButton}>
              <Text style={styles.buttonText1}>Add Items</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.checkoutButton}>
              <Text style={styles.buttonText3}>Checkout</Text>
            </TouchableOpacity>
          </View>
          <View style={{height: 20}} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  lineStyle: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    borderTopColor: '#ddd',
    borderTopWidth: 1,
    paddingVertical: 16,
  },
  lineStyle1: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 14,
  },
  headerText: {
    marginLeft: 10,
    ...commonFontStyle('i_600', 22, colors.black),
  },
  toggleContainer: {
    flexDirection: 'row',
    borderRadius: 40,
    borderWidth: 1,
  },
  toggleButton: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    borderRadius: 40,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  activeToggle: {
    backgroundColor: colors.themeColor,
  },
  inactiveToggle: {
    backgroundColor: 'transparent',
  },
  toggleText: {
    ...commonFontStyle('i_500', 17, colors._959595),
  },
  activeText: {
    color: colors.white,
  },
  cartItem: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingHorizontal: 30,
  },
  cartImage: {
    width: 100,
    height: 100,
    borderRadius: 15,
    // marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    ...commonFontStyle('i_600', 22, colors.black),
  },
  itemDescription: {
    marginVertical: 7,
    ...commonFontStyle('i_500', 17, colors._737373),
  },
  itemPrice: {
    ...commonFontStyle('i_500', 22, colors.themeColor),
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },

  button: {
    backgroundColor: colors.themeColor,
    paddingHorizontal: 10,
    paddingVertical: 4,
    // borderRadius: 6,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
  },
  button1: {
    backgroundColor: colors.themeColor,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
  },
  buttonText: {
    ...commonFontStyle('i_600', 22, colors.white),
  },
  buttonText1: {
    ...commonFontStyle('i_600', 20, colors.themeColor),
  },
  buttonText3: {
    ...commonFontStyle('i_600', 20, colors.white),
  },
  quantity: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: colors.white,
    ...commonFontStyle('i_500', 20, colors.black),
  },

  iconStyle4: {
    width: 27,
    height: 26,
    resizeMode: 'contain',
    marginRight: 8,
  },
  iconStyle5: {
    width: 15,
    height: 18,
    resizeMode: 'contain',
    marginRight: 8,
  },
  infoText: {
    color: colors._8B8B8B,
  },

  rediaStyle: {
    width: 27,
    height: 27,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.themeColor,
    borderRadius: 27,
  },
  rediaStyle1: {
    width: 15,
    height: 15,
    borderRadius: 15,
    backgroundColor: colors.themeColor,
  },

  discountSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  sectionTitle: {...commonFontStyle('600', 22, colors.black)},
  viewOffers: {...commonFontStyle('500', 18, colors.themeColor)},
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 20,
    marginTop: 10,
  },
  input1: {
    flex: 1,
    ...commonFontStyle('400', 14, colors.themeColor),
    lineHeight: 14,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    // padding: 8,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 5,
    flexDirection: 'row',
    alignItems: 'center',
    height: 43,
  },
  applyButton: {
    padding: 10,
    backgroundColor: colors.themeColor,
    borderRadius: 5,
    marginRight: 5,
  },
  applyMainButton: {
    backgroundColor: colors.themeColor,
    paddingHorizontal: 18,
    height: 43,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  applyText: {...commonFontStyle('600', 20, colors.white)},
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(20),
  },
  summaryTextBold: {
    ...commonFontStyle('700', 27, colors.black),
  },
  summaryText: {...commonFontStyle('500', 20, colors.black)},
  promoText: {...commonFontStyle('500', 20, colors._EDAA3C)},
  DeliveryText: {
    paddingHorizontal: wp(20),
    marginBottom: 12,
    ...commonFontStyle('i_600', 17, colors._747474),
  },
  redeemSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: wp(20),
  },
  redeemText: {...commonFontStyle('500', 20, colors.black)},
  redeemInfo: {
    color: 'green',
    marginBottom: 10,
    paddingHorizontal: wp(20),
    ...commonFontStyle('500', 17, colors.black),
    marginTop: 10,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: wp(20),
  },
  totalText: {...commonFontStyle('700', 25, colors.black)},
  totalText1: {...commonFontStyle('400', 25, colors.black)},
  instructionInput: {
    backgroundColor: colors.white,
    padding: 14,
    borderRadius: 8,
    ...commonFontStyle('i_400', 17, colors.black),
    minHeight: 110,
    textAlignVertical: 'top',
    // elevation: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowOpacity: 10,
    marginHorizontal: wp(20),
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(20),
  },
  addItemButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 5,
    alignItems: 'center',
    marginRight: 5,
    paddingVertical: 14,
    paddingHorizontal: 10,
  },
  checkoutButton: {
    flex: 1,
    backgroundColor: colors.themeColor,
    borderRadius: 5,
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 10,
  },
});
