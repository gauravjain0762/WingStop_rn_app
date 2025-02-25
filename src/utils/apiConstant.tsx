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
};

export const POST = 'POST';
export const GET = 'GET';
export const PATCH = 'PATCH';
export const DELETE = 'DELETE';
