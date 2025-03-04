import {
  IS_LOADING,
  SET_APP_THEME,
  SET_FCM_TOKEN,
  SET_LANGUAGE,
  SET_USER_ADDRESS,
} from '../actionTypes';

const initialState = {
  language: 'en',
  isLoading: false,
  isDarkTheme: false,
  fcmToken: undefined,
  userAddressList: [],
  defaultAddress: [],
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case SET_LANGUAGE: {
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
    case SET_USER_ADDRESS: {
      let defaultAddress;
      if (action?.payload && action?.payload?.length > 0) {
        let temp = action?.payload.filter(
          (obj: any) => obj.is_default === true,
        );
        if (temp?.length > 0) {
          defaultAddress = temp[0];
        }
      }
      return {
        ...state,
        userAddressList: action?.payload,
        defaultAddress: defaultAddress,
      };
    }

    default:
      return state;
  }
}
