import React, {FC, useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Modal,
  ImageBackground,
  ScrollView,
} from 'react-native';
import CustomHeader from '../../component/common/CustomHeader';
import {AppStyles} from '../../theme/appStyles';
import {useTranslation} from 'react-i18next';
import {IMAGES} from '../../assets/Images';
import {colors} from '../../theme/colors';
import FoodMenu from '../../component/Card/FoodMenu';
import {commonFontStyle, hp, wp} from '../../theme/fonts';
import OrderList from '../../component/Card/OrderList';
import CustomButton from '../../component/common/CustomButton';

let data = [
  {
    id: 1,
    title: 'Order Type',
    value: 'Delivery',
  },
  {
    id: 2,
    title: 'Branch Name',
    value: 'Dubai internet city',
  },
  {
    id: 3,
    title: 'Date & Time:',
    value: '22-01-2025 - 12:00 am',
  },
  {
    id: 4,
    title: 'Ordered Items',
    value: [
      {count: 2, item: 'Burgers', time: '10:00'},
      {count: 1, item: 'Group Meals', time: '20:00'},
      {count: 1, item: 'Fries', time: '05:00'},
      {count: 1, item: 'Kids meal', time: '12:00'},
      {count: 1, item: 'Plater', time: '20:00'},
    ],
  },
  {
    id: 5,
    title: 'Order Status',
    value: 'Delivered',
  },
];

const OrdersDetailScreen = () => {
  const {t} = useTranslation();

  const OrderView: FC<any> = (Items: any) => {
    const {title, value} = Items;
    if (title == 'Ordered Items') {
      return (
        <View style={{...styles.orderView, paddingBottom: hp(22)}}>
          <Text style={styles.title}>{t(title)}</Text>
          {value?.map(item => (
            <View style={styles.orderrow}>
              <Text style={styles.leftItem}>
                {item?.count} X {item?.item}
              </Text>
              <Text style={styles.time}>
                {'AED '}
                {item?.time}
              </Text>
            </View>
          ))}
        </View>
      );
    } else {
      return (
        <View style={styles.orderView}>
          <Text style={styles.title}>{t(title)}</Text>
          <Text style={styles.value}>{value}</Text>
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={[AppStyles.mainWhiteContainer]}>
      <CustomHeader title={t('Orders Detail')} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={IMAGES.bg1}
          resizeMode="contain"
          style={{
            width: '100%',
            height: hp(139),
            justifyContent: 'space-between',
            alignSelf: 'center',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View>
            <Text style={styles.text1}>{t('Estimated delivery time')}</Text>
            <Text style={styles.text2}>20:00 - 20:20</Text>
          </View>
          <Image source={IMAGES.bag} style={styles.bag} />
        </ImageBackground>
        <View style={styles.detailsContainer}>
          <View style={styles.bundleHeader}>
            <View>
              <Text style={styles.nightbundle}>{t('Night Bundle')}</Text>
              <Text style={styles.titleamount}>{'AED 15.00'}</Text>
            </View>
            <Text style={styles.orderId}>{'Order ID 5689'}</Text>
          </View>
          <View style={styles.orderCotainer}>
            <FlatList
              data={data}
              contentContainerStyle={{
                paddingHorizontal: wp(21),
              }}
              scrollEnabled={false}
              ItemSeparatorComponent={() => <View style={{height: hp(10)}} />}
              renderItem={({item, index}) => <OrderView {...item} />}
            />
          </View>
          <View style={styles.totalContainer}>
            <View style={styles.totalRow}>
              <Text style={styles.suborderLabel}>{t('Subtotal')}</Text>
              <Text style={styles.subtotalamount}>{'AED 67.00'}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.orderLabel}>{t('Delivery Fee')}</Text>
              <Text style={styles.totalamount}>{'AED 5.00'}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={{...styles.orderLabel, color: colors.black}}>
                {t('Promo Code (wing 50)')}
              </Text>
              <Text style={{...styles.totalamount, color: colors.black}}>
                {'AED 5.00'}
              </Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.orderLabel}>{t('VAT')}</Text>
              <Text style={styles.totalamount}>{'AED 2.00'}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={{...commonFontStyle('700', 20, colors.black)}}>
                {t('Total Amount')}
              </Text>
              <Text style={{...commonFontStyle('700', 20, colors.black)}}>
                {'AED 69.00'}
              </Text>
            </View>
          </View>
          <View style={styles.payment}>
            <Text style={styles.paymentlabel}>{t('Payment Method')}</Text>
            <Text style={styles.value}>{t('Apple Pay')}</Text>
          </View>
          <CustomButton
            extraStyle={styles.btn}
            extraTextStyle={styles.btnStyle}
            title={t('Re-order')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  filterText: {...commonFontStyle('i_400', 20, colors.black)},
  text1: {
    ...commonFontStyle('i_600', 18, colors.black),
    marginLeft: 40,
  },
  text2: {
    ...commonFontStyle('i_400', 18, colors.black),
    marginLeft: 40,
    marginTop: 6,
  },
  bag: {
    width: wp(60),
    height: wp(60),
    marginRight: wp(32),
  },
  detailsContainer: {
    flex: 1,
  },
  bundleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: wp(21),
  },
  nightbundle: {
    ...commonFontStyle('i_700', 20, colors.black),
  },
  orderId: {
    ...commonFontStyle('i_500', 15, colors._4D4C4C),
  },
  titleamount: {
    ...commonFontStyle('i_500', 20, colors.black),
    marginTop: hp(10),
  },
  orderCotainer: {
    marginTop: hp(20),
  },
  orderView: {
    backgroundColor: colors.white,
    borderRadius: wp(15),
    paddingVertical: hp(10),
    paddingHorizontal: wp(25),
    gap: wp(2),
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowColor: '#000000',
    shadowRadius: 5,
    shadowOpacity: 0.05,
  },
  title: {
    ...commonFontStyle('i_600', 18, colors.black),
  },
  value: {
    ...commonFontStyle('i_400', 18, colors._7E7E7E),
  },
  leftItem: {
    ...commonFontStyle('i_400', 18, colors._7E7E7E),
  },
  orderrow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: hp(17),
  },
  time: {
    ...commonFontStyle('i_500', 18, colors._585858),
  },
  totalContainer: {
    marginTop: hp(6),
  },
  totalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp(17),
    borderBottomWidth: 1,
    borderBottomColor: colors._E1E1E180,
    paddingHorizontal: wp(26),
  },
  orderLabel: {
    ...commonFontStyle('500', 20, colors._8C8C8C),
  },
  totalamount: {
    ...commonFontStyle('500', 20, colors._8C8C8C),
  },
  suborderLabel: {
    ...commonFontStyle('400', 20, colors._1C5F36),
  },
  subtotalamount: {
    ...commonFontStyle('400', 20, colors._1C5F36),
  },
  payment: {
    gap: hp(8),
    paddingVertical: hp(17),
    paddingHorizontal: wp(26),
    borderBottomWidth: 1,
    borderBottomColor: colors._E1E1E180,
  },
  paymentlabel: {
    ...commonFontStyle('600', 18, colors.black),
  },
  btn: {
    marginTop: hp(28),
    width: 'auto',
    flex: 1,
    marginHorizontal: wp(21),
  },
  btnStyle: {
    ...commonFontStyle('i_700', 22, colors.white),
  },
});

export default OrdersDetailScreen;
