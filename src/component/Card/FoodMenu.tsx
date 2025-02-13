import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {IMAGES} from '../../assets/Images';
import {useTranslation} from 'react-i18next';
import {commonFontStyle} from '../../theme/fonts';
import {colors} from '../../theme/colors';
import {AppStyles} from '../../theme/appStyles';
import {navigationRef} from '../../navigation/RootContainer';
import {SCREENS} from '../../navigation/screenNames';
// import Icon from 'react-native-vector-icons/Feather';

const categories = [
  {id: '1', name: 'Promotions', icon: 'megaphone'},
  {id: '2', name: 'Burgers', icon: 'hamburger'},
  {id: '3', name: 'Individual...', icon: 'user'},
];

const FoodMenu = ({item, cart, setCart}) => {
  const {t} = useTranslation();

  const quantity = cart[item.id] || 0;

  const increaseQuantity = () => {
    setCart(prev => ({...prev, [item.id]: quantity + 1}));
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setCart(prev => ({...prev, [item.id]: quantity - 1}));
    } else {
      const updatedCart = {...cart};
      delete updatedCart[item.id];
      setCart(updatedCart);
    }
  };

  return (
    <TouchableOpacity
      onPress={() => {
        navigationRef.navigate(SCREENS.DetailsViewScreen);
      }}
      style={styles.card}>
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
          <Text style={styles.price}>{item.price}</Text>
          {quantity > 0 ? (
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                onPress={decreaseQuantity}
                style={styles.button}>
                <Text style={styles.buttonText}>−</Text>
              </TouchableOpacity>
              <Text style={styles.quantity}>{quantity}</Text>
              <TouchableOpacity
                onPress={increaseQuantity}
                style={styles.button1}>
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              onPress={increaseQuantity}
              style={styles.orderButton}>
              <Text style={styles.orderButtonText}>{t('Order')}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <Image source={{uri: item.image}} style={styles.image} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
  },
  card: {
    flexDirection: 'row',
    marginVertical: 16,
  },
  image: {
    width: 131,
    height: 131,
    borderRadius: 8,
  },
  details: {
    flex: 1,
  },
  name: {
    marginBottom: 8,
    ...commonFontStyle('i_500', 17, colors.black),
  },
  description: {
    marginBottom: 6,
    width: '95%',
    ...commonFontStyle('i_400', 15, colors._7C7C7C),
  },
  price: {
    ...commonFontStyle('i_500', 16, colors.black),
  },
  orderButton: {
    backgroundColor: colors.themeColor,
    paddingVertical: 7,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  orderButtonText: {
    ...commonFontStyle('i_600', 17, colors.white),
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  quantity: {
    marginHorizontal: 12,
    ...commonFontStyle('i_500', 20, colors.black),
  },
});

export default FoodMenu;
