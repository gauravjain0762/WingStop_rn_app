import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  Platform,
} from 'react-native';
import CustomHeader from '../../component/common/CustomHeader';
import {AppStyles} from '../../theme/appStyles';
import {useTranslation} from 'react-i18next';
import {IMAGES} from '../../assets/Images';
import {colors} from '../../theme/colors';
import FoodMenu from '../../component/Card/FoodMenu';
import {commonFontStyle, wp} from '../../theme/fonts';
import {navigationRef} from '../../navigation/RootContainer';
import {SCREENS} from '../../navigation/screenNames';
// import {MaterialIcons} from '@expo/vector-icons';

const categories = [
  {id: '1', name: 'Promotions', icon: IMAGES.ic_Promotions},
  {id: '2', name: 'Burgers', icon: IMAGES.Burgers},
  {id: '3', name: 'Individual Meals', icon: IMAGES.Individual_ic},
];

const dips = [
  {
    id: '1',
    name: 'Ranch Dip',
    image:
      'https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?auto=compress&cs=tinysrgb&w=800',
    weight: '100 mg',
    price: 'AED +10.00',
  },
  {
    id: '2',
    name: 'Honey Mustard',
    image:
      'https://images.pexels.com/photos/940302/pexels-photo-940302.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    weight: '100 mg',
    price: 'AED +10.00',
  },
  {
    id: '3',
    name: 'Hot Cheddar Cheese',
    image:
      'https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?auto=compress&cs=tinysrgb&w=800',
    weight: '100 mg',
    price: 'AED +10.00',
  },
];

const bundleData = {
  id: '1',
  name: 'Game Night Bundle',
  description:
    '8 Classic, 8 Boneless, 5 Tenders in 3 Flavors + 2 Fries + 2 Dips.',
  price: 'AED 50.00',
  image:
    'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', // Replace with actual image URL
};

const DetailsViewScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('1');
  const [quantities, setQuantities] = useState({});
  const [cart, setCart] = useState({});
  const [selectedId, setSelectedId] = useState(null);

  const {t} = useTranslation();

  return (
    <SafeAreaView style={[AppStyles.mainWhiteContainer]}>
      <CustomHeader title={t('Customize')} />
      {/* Categories */}
      <ScrollView>
        <Image source={{uri: bundleData.image}} style={styles.image} />
        <View style={AppStyles.mainSide}>
          <Text style={styles.title}>{bundleData.name}</Text>
          <Text style={styles.description}>{bundleData.description}</Text>
          <Text style={styles.price}>{bundleData.price}</Text>
          <Text style={styles.price1}>{t('Add extra Ingredients')}</Text>
        </View>
        <View style={AppStyles.mainSide}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 20,
              gap: 10,
              marginBottom: 10,
            }}>
            <Text style={styles.header}>{t('Dips')}</Text>
            <Text style={styles.optionalBadge}>{t('Optional')}</Text>
          </View>
          <FlatList
            data={dips}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.itemContainer}
                onPress={() => setSelectedId(item.id)}>
                <Image source={{uri: item.image}} style={styles.image1} />
                <View style={styles.textContainer}>
                  <Text style={styles.itemTitle}>{item.name}</Text>
                  <Text style={styles.itemDetails}>
                    {item.weight} {item.price}
                  </Text>
                </View>

                <Image
                  source={
                    selectedId === item.id ? IMAGES.checkIn : IMAGES.checkOut
                  }
                  style={{width: 25, height: 25, resizeMode: 'contain'}}
                />
              </TouchableOpacity>
            )}
          />
        </View>
        <View style={AppStyles.mainSide}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 20,
              gap: 10,
              marginBottom: 10,
            }}>
            <Text style={styles.header}>{t('Add a Beverages?')}</Text>
            <Text style={styles.optionalBadge1}>{t('Min Choose 1')}</Text>
          </View>
          <FlatList
            data={dips}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.itemContainer}
                onPress={() => setSelectedId(item.id)}>
                <Image source={{uri: item.image}} style={styles.image1} />
                <View style={styles.textContainer}>
                  <Text style={styles.itemTitle}>{item.name}</Text>
                  <Text style={styles.itemDetails}>
                    {item.weight} {item.price}
                  </Text>
                </View>
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
                <Image
                  source={
                    selectedId === item.id ? IMAGES.checkIn : IMAGES.checkOut
                  }
                  style={{width: 25, height: 25, resizeMode: 'contain'}}
                />
              </TouchableOpacity>
            )}
          />

          {/* Special Note Input */}
          <Text style={styles.label}>{t('Add Special Note')}</Text>
          <TextInput
            style={styles.input}
            placeholder={t('Write Your Note')}
            placeholderTextColor="#A0A0A0"
            multiline
          />

          {/* Cart Summary */}
          <View style={styles.cartContainer}>
            <View style={styles.cartLeft}>
              <View style={styles.itemCount}>
                <Text style={styles.itemCountText}>2</Text>
              </View>
              <View>
                <Text style={styles.price}>12.00 AED</Text>
                <Text style={styles.subText}>{t('inclusive of taxes')}</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.button2}
              onPress={() => {
                navigationRef.navigate(SCREENS.CartScreen);
              }}>
              <Image
                source={IMAGES.addCart}
                style={{
                  width: 16,
                  height: 16,
                  tintColor: colors.black,
                  resizeMode: 'contain',
                }}
              />
              <Text style={styles.buttonText1}>{t('View Cart')}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{height: 30}} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 220,
  },
  title: {
    marginTop: 19,
    ...commonFontStyle('i_700', 19, colors.black),
  },
  description: {
    marginTop: 9,
    ...commonFontStyle('i_400', 15, colors._7C7C7C),
  },
  price: {
    marginTop: 19,
    ...commonFontStyle('i_600', 19, colors.black),
  },
  price1: {
    marginTop: 19,
    ...commonFontStyle('i_700', 20, colors.black),
  },

  container: {},
  header: {
    ...commonFontStyle('i_600', 18, colors.black),
  },
  optionalBadge: {
    backgroundColor: colors._E9FFF2,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    alignSelf: 'flex-start',
    ...commonFontStyle('i_500', 12, colors.themeColor),
    borderWidth: 1,
    borderColor: colors._ADF5C9,
  },
  optionalBadge1: {
    backgroundColor: colors._FFF6E6,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: colors._F7D297,
    ...commonFontStyle('i_500', 12, colors._DA9421),
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  image1: {
    width: 70,
    height: 70,
    borderRadius: 15,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  itemTitle: {
    ...commonFontStyle('i_500', 16, colors._010101),
  },
  itemDetails: {
    ...commonFontStyle('i_400', 16, colors._737373),
    marginTop: 5,
  },

  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    right: 16,
    top: 10,
  },
  button: {
    backgroundColor: colors.themeColor,
    paddingHorizontal: 9,
    paddingVertical: 4,
    // borderRadius: 6,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
  },
  button1: {
    backgroundColor: colors.themeColor,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
  },
  buttonText: {
    ...commonFontStyle('i_600', 15, colors.white),
  },
  quantity: {
    paddingHorizontal: 9,
    paddingVertical: 4,
    backgroundColor: colors.white,
    ...commonFontStyle('i_500', 15, colors.black),
  },

  label: {
    marginBottom: 10,
    marginTop: 18,
    ...commonFontStyle('i_700', 19, colors.black),
  },
  input: {
    backgroundColor: colors.white,
    padding: 14,
    borderRadius: 8,
    ...commonFontStyle('i_400', 18, colors.black),
    minHeight: 110,
    textAlignVertical: 'top',
    // elevation: 1,
    shadowOpacity: Platform.OS == 'ios' ? 0 : 10,
  },
  cartContainer: {
    marginTop: 16,
    backgroundColor: colors.themeColor,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowOpacity: Platform.OS == 'ios' ? 0 : 10,
  },
  cartLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemCount: {
    backgroundColor: '#B22222',
    borderRadius: 36,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  itemCountText: {
    ...commonFontStyle('i_700', 20, colors.white),
  },
  price: {
    ...commonFontStyle('i_700', 20, colors.white),
  },
  subText: {
    ...commonFontStyle('i_400', 11, colors.white),
  },
  button2: {
    backgroundColor: colors._EDAA3C,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText1: {
    marginLeft: 6,
    ...commonFontStyle('i_700', 11, colors.black),
  },
});

export default DetailsViewScreen;
