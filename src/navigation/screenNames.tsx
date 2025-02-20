export const SCREENS = {
  HomeScreen: 'HomeScreen',
  LoginScreen: 'LoginScreen',
  SplashScreen: 'SplashScreen',
  GetStarted: 'GetStarted',
  SignUpScreen: 'SignUpScreen',
  VerificationScreen: 'VerificationScreen',
  ViewAllScreen: 'ViewAllScreen',
  DetailsViewScreen: 'DetailsViewScreen',
  CartScreen: 'CartScreen',
  CheckoutScreen: 'CheckoutScreen',
  MyOrdersScreen: 'MyOrdersScreen',
  OrdersDetailScreen: 'OrdersDetailScreen',
  AccountScreen: 'AccountScreen',
  Profile: 'Profile',
};

export interface ScreenNames {
  [key: string]: string;
  HomeScreen: string;
  LoginScreen: string;
  SplashScreen: string;
  GetStarted: string;
  SignUpScreen: string;
  VerificationScreen: string;
  ViewAllScreen: string;
  DetailsViewScreen: string;
  CartScreen: string;
  CheckoutScreen: string;
  OrdersDetailScreen: string;
  AccountScreen: string;
  Profile: string;
}

export const SCREEN_NAMES: ScreenNames = {
  ...SCREENS,
};
