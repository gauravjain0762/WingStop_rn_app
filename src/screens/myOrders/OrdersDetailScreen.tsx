import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Modal,
} from 'react-native';
import CustomHeader from '../../component/common/CustomHeader';
import {AppStyles} from '../../theme/appStyles';
import {useTranslation} from 'react-i18next';
import {IMAGES} from '../../assets/Images';
import {colors} from '../../theme/colors';
import FoodMenu from '../../component/Card/FoodMenu';
import {commonFontStyle, wp} from '../../theme/fonts';
import OrderList from '../../component/Card/OrderList';

const OrdersDetailScreen = () => {
  const {t} = useTranslation();

  return (
    <SafeAreaView style={[AppStyles.mainWhiteContainer]}>
      <CustomHeader title={t('Orders Detail')} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  filterText: {...commonFontStyle('i_400', 20, colors.black)},
});

export default OrdersDetailScreen;
