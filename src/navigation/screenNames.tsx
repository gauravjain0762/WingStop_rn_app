export const SCREENS = {
  HomeScreen: 'HomeScreen',
  LoginScreen: 'LoginScreen',
  SplashScreen: 'SplashScreen',
  GetStarted: 'GetStarted',
  SignUpScreen: 'SignUpScreen',
  VerificationScreen: 'VerificationScreen',
};

export interface ScreenNames {
  [key: string]: string;
  HomeScreen: string;
  LoginScreen: string;
  SplashScreen: string;
  GetStarted: string;
  SignUpScreen: string;
  VerificationScreen: string;
}

export const SCREEN_NAMES: ScreenNames = {
  ...SCREENS,
};
