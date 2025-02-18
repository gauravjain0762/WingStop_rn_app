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

const OrderList = ({item, cart, setCart}) => {
  const {t} = useTranslation();

  return (
    <View style={styles.card}>
      <View
        style={{flexDirection: 'row', alignItems: 'center', marginVertical: 5}}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.title1}>{t('Order ID')} 5689</Text>
      </View>
      <Text style={styles.branch}>
        {t('Branch')}: <Text style={styles.branch1}>{item.branch}</Text>
      </Text>
      <Text style={styles.date}>
        {t('Date & Time')}: <Text style={styles.date1}>{item.date}</Text>
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 5,
        }}>
        <Text style={styles.price}>{item.price}</Text>
        <View style={styles.statusContainer}>
          <Text style={[styles.status, styles[item.status.toLowerCase()]]}>
            {item.status}
          </Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.orderButton}>
          <Text style={styles.buttonText}>{t('Order Again')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.detailsButton}>
          <Text style={styles.detailsText}>{t('More Details')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
  },
  card: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingRight: 20,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginBottom: 16,
  },
  title: {
    flex: 1,
    paddingLeft: 12,
    ...commonFontStyle('i_700', 16, colors.black),
  },
  title1: {
    ...commonFontStyle('i_400', 14, colors._EDAA3C),
  },
  branch: {
    paddingLeft: 12,
    ...commonFontStyle('i_400', 14, colors.black),
    marginVertical: 4,
  },
  branch1: {
    paddingLeft: 12,
    ...commonFontStyle('i_400', 14, colors._7E7E7E),
  },
  date: {
    ...commonFontStyle('i_400', 14, colors.black),
    paddingLeft: 12,
    marginVertical: 2,
  },
  date1: {
    ...commonFontStyle('i_400', 14, colors._7E7E7E),
    paddingLeft: 12,
  },
  price: {
    marginVertical: 5,
    paddingLeft: 12,
    ...commonFontStyle('i_700', 16, colors.black),
  },
  statusContainer: {
    alignSelf: 'flex-start',
    borderRadius: 5,
    paddingHorizontal: 12,
    paddingVertical: 3,
  },
  status: {
    padding: 5,
    borderRadius: 5,
    ...commonFontStyle('i_400', 14, colors._1C5F36),
  },
  active: {
    backgroundColor: '#E8EFEB',
    color: colors._1C5F36,
  },
  cancelled: {
    backgroundColor: '#F9EAEA',
    color: '#856404',
  },
  completed: {
    backgroundColor: '#FDF6EB',
    color: '#E7A232',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  orderButton: {
    backgroundColor: '#184d2b',
    padding: 10,
    borderRadius: 50,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    ...commonFontStyle('i_500', 14, colors.white),
  },
  detailsButton: {
    borderWidth: 1,
    borderColor: '#BFBFBF',
    padding: 10,
    borderRadius: 50,
    flex: 1,
    alignItems: 'center',
    marginLeft: 10,
    justifyContent: 'center',
  },
  detailsText: {
    ...commonFontStyle('i_500', 14, colors._878585),
  },
  quantity: {
    marginHorizontal: 12,
    ...commonFontStyle('i_500', 20, colors.black),
  },
});

export default OrderList;
