import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {IMAGES} from '../../assets/Images';
import Modal from 'react-native-modal';
import {commonFontStyle} from '../../theme/fonts';
import {colors} from '../../theme/colors';
import {useTranslation} from 'react-i18next';

const OrderSuccessModal = ({visible, onClose}) => {
  const {t} = useTranslation();

  return (
    <Modal
      animationOutTiming={1000}
      useNativeDriver={Platform.OS == 'ios' ? false : true}
      onBackdropPress={() => onClose()}
      isVisible={visible}
      style={{
        margin: 0,
        justifyContent: 'flex-end',
      }}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Image source={IMAGES.bug} style={styles.image} />
          <Text style={styles.successText}>
            {t('Your order has been placed\nsuccessfully.')}
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.backButton} onPress={onClose}>
              <Text style={styles.backButtonText}>{t('Back To Home')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.orderButton}>
              <Text style={styles.orderButtonText}>{t('Order Detail')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 20,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    alignItems: 'center',
  },
  image: {
    width: 172,
    height: 172,
    resizeMode: 'contain',
  },
  successText: {
    textAlign: 'center',
    marginVertical: 20,
    ...commonFontStyle('i_400', 20, colors.black),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
    marginVertical: 20,
  },
  backButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.themeColor,
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: 'center',
    marginRight: 10,
  },
  backButtonText: {
    ...commonFontStyle('i_500', 16, colors.themeColor),
  },
  orderButton: {
    flex: 1,
    backgroundColor: colors.themeColor,
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: 'center',
  },
  orderButtonText: {
    ...commonFontStyle('i_500', 16, colors.white),
  },
});

export default OrderSuccessModal;
