/* eslint-disable react-hooks/exhaustive-deps */
import {Image, View} from 'react-native';
import React, {useEffect} from 'react';
import {resetNavigation} from '../../utils/commonFunction';
import {SCREENS} from '../../navigation/screenNames';
import SplashScreen from 'react-native-splash-screen';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../theme/fonts';
import {IMAGES} from '../../assets/Images';
import {dispatchAction, useAppDispatch} from '../../redux/hooks';
import {setAuthorization} from '../../utils/apiGlobal';
import {getAsyncToken, getAsyncUserInfo} from '../../utils/asyncStorage';
import {getUserAddressApi} from '../../redux/service/AddressServices';
import {USER_INFO} from '../../redux/actionTypes';

type Props = {};

const Splash = ({}: Props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => {
      getToken();
    }, 2000);
  }, []);

  const getToken = async () => {
    let token = await getAsyncToken();
    console.log('token', token);
    SplashScreen.hide();
    if (token) {
      let userData = await getAsyncUserInfo();
      dispatchAction(dispatch, USER_INFO, userData);
      await setAuthorization(token);
      let obj = {
        onSuccess: (_res: any) => {
          resetNavigation(SCREENS.HomeScreen);
        },
      };
      dispatch(getUserAddressApi(obj));
    } else {
      resetNavigation(SCREENS.GetStarted);
    }
  };

  return (
    <View>
      <Image
        source={IMAGES.splash}
        style={{width: SCREEN_WIDTH, height: SCREEN_HEIGHT}}
      />
    </View>
  );
};

export default Splash;
