import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import CustomHeader from '../../component/common/CustomHeader';
import {AppStyles} from '../../theme/appStyles';
import {useTranslation} from 'react-i18next';
import {IMAGES} from '../../assets/Images';
import {colors} from '../../theme/colors';
import FoodMenu from '../../component/Card/FoodMenu';
import {commonFontStyle, wp} from '../../theme/fonts';
import OrderList from '../../component/Card/OrderList';

const orders = [
  {
    id: '1',
    title: 'Night Bundle',
    branch: 'Dubai Internet City',
    date: '22-01-2025 - 12:00 am',
    price: 'AED 15.00',
    status: 'Active',
  },
  {
    id: '2',
    title: 'Hot Wings',
    branch: 'Dubai Internet City',
    date: '22-01-2025 - 12:00 am',
    price: 'AED 15.00',
    status: 'Cancelled',
  },
  {
    id: '3',
    title: 'Group Meals',
    branch: 'Dubai Internet City',
    date: '22-01-2025 - 12:00 am',
    price: 'AED 15.00',
    status: 'Completed',
  },
];

const MyOrdersScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('1');
  const [quantities, setQuantities] = useState({});
  const [cart, setCart] = useState({});

  const {t} = useTranslation();

  const handleIncrease = id => {
    setQuantities(prev => ({...prev, [id]: (prev[id] || 0) + 1}));
  };

  const handleDecrease = id => {
    setQuantities(prev => ({...prev, [id]: Math.max((prev[id] || 0) - 1, 0)}));
  };

  return (
    <SafeAreaView style={[AppStyles.mainWhiteContainer]}>
      <CustomHeader title={t('My Orders')} />
      <View
        style={[
          {flexDirection: 'row', alignItems: 'center', marginVertical: 16},
          AppStyles.mainSide,
        ]}>
        <Text style={styles.allOrderText}>{t('All Orders')}</Text>
        <TouchableOpacity>
          <Image source={IMAGES.filter} style={styles.filter} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={orders}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <OrderList item={item} cart={cart} setCart={setCart} />
        )}
        contentContainerStyle={styles.container}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: 5,
    paddingVertical: 10,
    paddingHorizontal: 18,
  },
  activeCategory: {
    backgroundColor: colors.themeColor,
  },
  categoryText: {
    marginLeft: 5,
    ...commonFontStyle('i_500', 14, colors._3C3C3C),
  },
  activeCategoryText: {
    color: 'white',
  },
  lineStyle: {
    width: '110%',
    height: 20,
    elevation: 1,
    resizeMode: 'stretch',
  },
  container: {
    marginHorizontal: wp(20),
  },
  filter: {
    width: 22,
    height: 21,
    resizeMode: 'contain',
  },
  allOrderText: {
    ...commonFontStyle('i_500', 22, colors.black),
    flex: 1,
  },
});

export default MyOrdersScreen;
