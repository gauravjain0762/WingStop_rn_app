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

const CustomHeader = ({title}) => {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState('1');
  const {t} = useTranslation();

  return (
    <View style={[styles.container, AppStyles.mainSide]}>
      {/* Back Button */}
      <View
        style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={IMAGES.back}
            style={{
              width: 37,
              height: 37,
              elevation: 10,
              borderWidth: 0.01,
              borderRadius: 10,
            }}
          />
        </TouchableOpacity>
        <Text style={styles.backText}>{title}</Text>
        <View style={styles.rightContainer}>
          <TouchableOpacity>
            <Image
              source={IMAGES.notification}
              style={[styles.iconStyle3, {marginRight: 15}]}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigationRef.navigate(SCREENS.CartScreen);
            }}>
            <Image source={IMAGES.cardAdd} style={styles.iconStyle3} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  backText: {
    marginLeft: 18,
    ...commonFontStyle('i_500', 18, colors.black),
    flex: 1,
  },
  iconStyle3: {
    width: 44,
    height: 44,
    resizeMode: 'contain',
  },
  rightContainer: {
    flexDirection: 'row',
  },
});

export default CustomHeader;
