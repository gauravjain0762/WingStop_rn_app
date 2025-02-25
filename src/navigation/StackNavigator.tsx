/* eslint-disable react/react-in-jsx-scope */
import {FC} from 'react';
import HomeScreen from '../screens/home/HomeScreen';
import {SCREENS} from './screenNames';
import LoginScreen from '../screens/auth/LoginScreen';

import Splash from '../screens/auth/Splash';
import GetStarted from '../screens/auth/GetStarted';
import SignUpScreen from '../screens/auth/SignUpScreen';
import VerificationScreen from '../screens/auth/VerificationScreen';
import ViewAllScreen from '../screens/home/ViewAllScreen';
import DetailsViewScreen from '../screens/home/DetailsViewScreen';
import CartScreen from '../screens/cart/CartScreen';
import CheckoutScreen from '../screens/checkout/CheckoutScreen';
import MyOrdersScreen from '../screens/myOrders/MyOrdersScreen';
import OrdersDetailScreen from '../screens/myOrders/OrdersDetailScreen';
import AccountScreen from '../screens/Account/AccountScreen';
import Profile from '../screens/Account/Profile';
import SelectOrder from '../screens/myOrders/SelectOrder';
import LoyalityScreen from '../screens/Loyality/LoyalityScreen';
import Notification from '../screens/Account/Notification';
import MyAddress from '../screens/Account/MyAddress';
import SearchScreen from '../screens/home/SearchScreen';
import PromotionScreen from '../screens/myOrders/PromotionScreen';
import PromotionDetails from '../screens/myOrders/PromotionDetails';
import {createStackNavigator} from '@react-navigation/stack';

export type RootStackParamList = {
  HomeScreen: undefined;
};
// const headerStyleTransparent = {
//   headerStyle: {
//     backgroundColor: colors.white,
//     shadowOpacity: 0,
//     elevation: 0,
//   },
//   headerTitleStyle: {
//     // ...commonFontStyle(i18n.language, 500, 19, colors.black),
//   },
//   headerTitleAlign: 'center',
//   // ...TransitionPresets.SlideFromRightIOS,
// };
const Stack = createStackNavigator();

const StackNavigator: FC = () => {
  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   messaging().setAutoInitEnabled(true);
  //   setNotification();
  // }, []);
  // const setNotification = async () => {
  //   let authStatus = await firebase.messaging().hasPermission();

  //   if (authStatus !== firebase.messaging.AuthorizationStatus.AUTHORIZED) {
  //     requestPermission();
  //   }

  //   if (authStatus === firebase.messaging.AuthorizationStatus.AUTHORIZED) {
  //     getToken();
  //   }
  // };
  // const requestPermission = () => {
  //   messaging()
  //     .requestPermission({
  //       alert: true,
  //       announcement: false,
  //       badge: true,
  //       carPlay: true,
  //       provisional: false,
  //       sound: true,
  //     })
  //     .then(() => {
  //       getToken();
  //     })
  //     .catch(error => {
  //       console.log('error', error);
  //     });
  // };
  // const getToken = async () => {
  //   messaging()
  //     .getToken()
  //     .then(fcmToken => {
  //       if (fcmToken) {
  //         console.log('fcm--', fcmToken);
  //         dispatchAction(dispatch, SET_FCM_TOKEN, fcmToken);
  //       } else {
  //         console.log('[FCMService] User does not have a device token');
  //       }
  //     })
  //     .catch(error => {
  //       let err = `FCm token get error${error}`;
  //       console.log(err);
  //     });
  // };
  //   const checkNotification = (remoteMessage: any) => {};
  // useEffect(() => {
  //   messaging().onNotificationOpenedApp(remoteMessage => {
  //     if (remoteMessage) {
  //       console.log(
  //         'Notification caused app to open from background state:',
  //         remoteMessage.notification,
  //       );
  //       checkNotification(remoteMessage);
  //     }
  //   });
  //   // Check whether an initial notification is available
  //   messaging()
  //     .getInitialNotification()
  //     .then(remoteMessage => {
  //       console.log('getInitialNotification', remoteMessage);
  //       if (remoteMessage) {
  //         console.log(
  //           'Notification caused app to open from quit state:',
  //           remoteMessage.notification,
  //         );
  //       }
  //       checkNotification(remoteMessage);
  //     });
  //   messaging().setBackgroundMessageHandler(async remoteMessage => {
  //     console.log('Message handled in the background!', remoteMessage);
  //     checkNotification(remoteMessage);
  //   });
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     console.log('A new FCM message arrived!', remoteMessage);
  //     checkNotification(remoteMessage);
  //     onDisplayNotification(remoteMessage);
  //   });
  //   return unsubscribe;
  // }, []);
  // async function onDisplayNotification(message: any) {
  //   // Request permissions (required for iOS)
  //   await notifee.requestPermission();

  //   const channelId = await notifee.createChannel({
  //     id: 'default',
  //     name: 'Default Channel',
  //     importance: AndroidImportance.HIGH,
  //   });
  //   notifee.displayNotification({
  //     title: message.notification.title,
  //     body: message.notification.body,
  //     android: {
  //       channelId,
  //       smallIcon: 'ic_stat_name',
  //       sound: 'noti.mp3',
  //     },
  //     ios: {
  //       sound: 'noti.wav',
  //     },
  //   });
  // }

  return (
    <Stack.Navigator initialRouteName={SCREENS.SplashScreen}>
      <Stack.Screen
        options={({}) => ({
          headerShown: false,
        })}
        name={SCREENS.SplashScreen}
        component={Splash}
      />
      <Stack.Screen
        options={({}) => ({
          headerShown: false,
        })}
        name={SCREENS.GetStarted}
        component={GetStarted}
      />
      <Stack.Screen
        options={({}) => ({
          headerShown: false,
        })}
        name={SCREENS.LoginScreen}
        component={LoginScreen}
      />
      <Stack.Screen
        options={({}) => ({
          headerShown: false,
        })}
        name={SCREENS.SignUpScreen}
        component={SignUpScreen}
      />
      <Stack.Screen
        options={({}) => ({
          headerShown: false,
        })}
        name={SCREENS.VerificationScreen}
        component={VerificationScreen}
      />
      <Stack.Screen
        options={({}) => ({
          headerShown: false,
        })}
        name={SCREENS.HomeScreen}
        component={HomeScreen}
      />
      <Stack.Screen
        options={({}) => ({
          headerShown: false,
        })}
        name={SCREENS.ViewAllScreen}
        component={ViewAllScreen}
      />
      <Stack.Screen
        options={({}) => ({
          headerShown: false,
        })}
        name={SCREENS.DetailsViewScreen}
        component={DetailsViewScreen}
      />
      <Stack.Screen
        options={({}) => ({
          headerShown: false,
        })}
        name={SCREENS.CartScreen}
        component={CartScreen}
      />
      <Stack.Screen
        options={({}) => ({
          headerShown: false,
        })}
        name={SCREENS.CheckoutScreen}
        component={CheckoutScreen}
      />
      <Stack.Screen
        options={({}) => ({
          headerShown: false,
        })}
        name={SCREENS.MyOrdersScreen}
        component={MyOrdersScreen}
      />
      <Stack.Screen
        options={({}) => ({
          headerShown: false,
        })}
        name={SCREENS.OrdersDetailScreen}
        component={OrdersDetailScreen}
      />
      <Stack.Screen
        options={({}) => ({
          headerShown: false,
        })}
        name={SCREENS.AccountScreen}
        component={AccountScreen}
      />
      <Stack.Screen
        options={({}) => ({
          headerShown: false,
        })}
        name={SCREENS.Profile}
        component={Profile}
      />
      <Stack.Screen
        options={({}) => ({
          headerShown: false,
        })}
        name={SCREENS.SelectOrder}
        component={SelectOrder}
      />
      <Stack.Screen
        options={({}) => ({
          headerShown: false,
        })}
        name={SCREENS.LoyalityScreen}
        component={LoyalityScreen}
      />
      <Stack.Screen
        options={({}) => ({
          headerShown: false,
        })}
        name={SCREENS.Notification}
        component={Notification}
      />
      <Stack.Screen
        options={({}) => ({
          headerShown: false,
        })}
        name={SCREENS.MyAddress}
        component={MyAddress}
      />
      <Stack.Screen
        options={({}) => ({
          headerShown: false,
        })}
        name={SCREENS.SearchScreen}
        component={SearchScreen}
      />
      <Stack.Screen
        options={({}) => ({
          headerShown: false,
        })}
        name={SCREENS.PromotionScreen}
        component={PromotionScreen}
      />
      <Stack.Screen
        options={({}) => ({
          headerShown: false,
        })}
        name={SCREENS.PromotionDetails}
        component={PromotionDetails}
      />
    </Stack.Navigator>
  );
};
export default StackNavigator;
