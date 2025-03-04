export const API = {
  BASE_URL: 'https://sky.devicebee.com/WingStop/api',

  // Auth
  login: '/login/',
  register: '/register/',
  guestLogin: '/guestLogin/',
  sendOTP: '/sendOTP/',
  verifyOTP: '/verifyOTP/',
  resendOTP: '/resendOTP/',
  logout: '/logout/',
  googleSignin: '/googleSignin/',
  appleSignin: '/appleSignin/',
  forgotPassword: '/forgotPassword/',
  resetPassword: '/resetPassword/',

  // user
  getProfile: '/getProfile/',
  updateProfile: '/updateProfile/',
  deleteAccount: '/deleteAccount/',

  // address
  addAddress: '/addAddress/',
  getUserAddress: '/getUserAddress/',
  updateAddress: '/updateAddress/',
  removeAddress: '/removeAddress/',
  makeAddressDefault: '/makeAddressDefault/',

  // home

  getDashboard: '/getDashboard/',
  getPromotions: '/getPromotions/',
};

export const POST = 'POST';
export const GET = 'GET';
export const PATCH = 'PATCH';
export const DELETE = 'DELETE';

export const WEB_CLIENT_ID =
  '146820459121-lcfvks98mqe3aiipd40q383ocfnsquv0.apps.googleusercontent.com';
export const GOOGLE_MAP_API_KEY = 'AIzaSyDPnyePOuQXYI-Grk0uDer6on7Wdtt1zI4';
