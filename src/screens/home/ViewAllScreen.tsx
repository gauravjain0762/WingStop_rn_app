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
// import {MaterialIcons} from '@expo/vector-icons';

const categories = [
  {id: '1', name: 'Promotions', icon: IMAGES.ic_Promotions},
  {id: '2', name: 'Burgers', icon: IMAGES.Burgers},
  {id: '3', name: 'Individual Meals', icon: IMAGES.Individual_ic},
];

const menuItems = [
  {
    id: '1',
    name: 'Game Night Bundle',
    description:
      '8 Classic, 8 Boneless, 5 Tenders in 3 Flavors + 2 Fries + 2 Dips.',
    price: 'AED 50.00',
    image:
      'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', // Replace with actual image URL
  },
  {
    id: '2',
    name: 'Hot Lemon Combo',
    description:
      '8 Classic, 8 Boneless, 5 Tenders in 3 Flavors + 2 Fries + 2 Dips.',
    price: 'AED 50.00',
    image:
      'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', // Replace with actual image URL
  },
];

const ViewAllScreen = () => {
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
      <CustomHeader title={t('Promotions')} />
      {/* Categories */}
      <View style={[{marginVertical: 10, marginLeft: 20}]}>
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableOpacity
              style={[
                styles.categoryItem,
                selectedCategory === item.id && styles.activeCategory,
              ]}
              onPress={() => setSelectedCategory(item.id)}>
              <Image source={item.icon} style={{width: 24, height: 24}} />
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === item.id && styles.activeCategoryText,
                ]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <Image source={IMAGES.line} style={styles.lineStyle} />

      <FlatList
        data={menuItems}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <FoodMenu item={item} cart={cart} setCart={setCart} />
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
});

export default ViewAllScreen;
