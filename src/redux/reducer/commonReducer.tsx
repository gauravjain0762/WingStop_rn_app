import {
  IS_LOADING,
  SET_APP_THEME,
  SET_FCM_TOKEN,
  SET_LANGAUGE,
  USER_LOGOUT,
} from '../actionTypes';

const initialState = {
  language: 'en',
  isLoading: false,
  isDarkTheme: false,
  fcmToken: undefined,
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case SET_LANGAUGE: {
      return {...state, language: action.payload};
    }
    case IS_LOADING: {
      return {...state, isLoading: action.payload};
    }
    case SET_APP_THEME: {
      return {...state, isDarkTheme: action.payload};
    }
    case SET_FCM_TOKEN: {
      return {...state, fcmToken: action?.payload};
    }
    default:
      return state;
  }
}
