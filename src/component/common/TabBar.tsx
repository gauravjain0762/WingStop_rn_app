import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC, useState} from 'react';
import {IMAGES} from '../../assets/Images';
import {useTranslation} from 'react-i18next';
import {commonFontStyle, hp, wp} from '../../theme/fonts';
import {colors} from '../../theme/colors';

type tab = {
  onChange?: (e: string) => void;
};

const TabBar: FC<tab> = ({onChange = () => {}}) => {
  const [pickup, setPickup] = useState(true);
  const {t} = useTranslation();
  return (
    <View style={[styles.toggleContainer]}>
      <TouchableOpacity
        style={[
          styles.toggleButton,
          !pickup ? styles.activeToggle : styles.inactiveToggle,
        ]}
        onPress={() => {
          setPickup(false), onChange('Delivery');
        }}>
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
        onPress={() => (setPickup(true), onChange('Pick Up'))}>
        <Image
          source={IMAGES.pick1}
          style={[styles.iconStyle5, {tintColor: pickup ? 'white' : '#959595'}]}
        />
        <Text style={[styles.toggleText, pickup && styles.activeText]}>
          {t('Pick Up')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  toggleContainer: {
    flexDirection: 'row',
    borderRadius: 40,
    borderWidth: 1,
    borderColor: colors._DFDFDF,
    marginTop: hp(20),
    backgroundColor: colors.white,
    marginHorizontal: wp(20),
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
});
