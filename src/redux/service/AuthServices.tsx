import {ThunkAction} from 'redux-thunk';
import {dispatchAction, RootState} from '../hooks';
import {AnyAction} from 'redux';
import {IS_LOADING, SET_LANGUAGE} from '../actionTypes';
import {
  handleErrorRes,
  handleSuccessRes,
  makeAPIRequest,
  setAuthorization,
} from '../../utils/apiGlobal';
import {API, POST} from '../../utils/apiConstant';
import {setAsyncLanguage, setAsyncToken} from '../../utils/asyncStorage';
import i18n from '../../locales/i18n';
import {resetNavigation} from '../../utils/commonFunction';
import {SCREENS} from '../../navigation/screenNames';

export const setLanguage = (code: any) => (dispatch: any) => {
  i18n.changeLanguage(code || 'en');
  setAsyncLanguage(code);
  dispatch({type: SET_LANGUAGE, payload: code || 'en'});
};

export const onLoginCall =
  (request: any): ThunkAction<void, RootState, unknown, AnyAction> =>
  async dispatch => {
    dispatchAction(dispatch, IS_LOADING, true);
    return makeAPIRequest({
      method: POST,
      url: API.login,
      data: request?.data,
    })
      .then(async (response: any) => {
        handleSuccessRes(response, request, dispatch, async () => {
          await setAuthorization(response?.data?.data?.auth_token);
          await setAsyncToken(response?.data?.data?.auth_token);
          resetNavigation(SCREENS.HomeScreen);
        });
      })
      .catch(error => {
        handleErrorRes(error, request, dispatch);
      });
  };

export const onRegisterCall =
  (request: any): ThunkAction<void, RootState, unknown, AnyAction> =>
  async dispatch => {
    dispatchAction(dispatch, IS_LOADING, true);
    return makeAPIRequest({
      method: POST,
      url: API.register,
      data: request?.data,
    })
      .then(async (response: any) => {
        handleSuccessRes(response, request, dispatch, () => {});
      })
      .catch(error => {
        handleErrorRes(error, request, dispatch);
      });
  };

export const onSendOTPCall =
  (request: any): ThunkAction<void, RootState, unknown, AnyAction> =>
  async dispatch => {
    dispatchAction(dispatch, IS_LOADING, true);
    return makeAPIRequest({
      method: POST,
      url: API.sendOTP,
      data: request?.data,
    })
      .then(async (response: any) => {
        handleSuccessRes(response, request, dispatch, () => {});
      })
      .catch(error => {
        handleErrorRes(error, request, dispatch);
      });
  };

export const onVerifyOTPCall =
  (request: any): ThunkAction<void, RootState, unknown, AnyAction> =>
  async dispatch => {
    dispatchAction(dispatch, IS_LOADING, true);
    return makeAPIRequest({
      method: POST,
      url: API.verifyOTP,
      data: request?.data,
    })
      .then(async (response: any) => {
        handleSuccessRes(response, request, dispatch, async () => {
          await setAuthorization(response?.data?.data?.auth_token);
          await setAsyncToken(response?.data?.data?.auth_token);
        });
      })
      .catch(error => {
        handleErrorRes(error, request, dispatch);
      });
  };

export const onResendOTPCall =
  (request: any): ThunkAction<void, RootState, unknown, AnyAction> =>
  async dispatch => {
    dispatchAction(dispatch, IS_LOADING, true);
    return makeAPIRequest({
      method: POST,
      url: API.resendOTP,
      data: request?.data,
    })
      .then(async (response: any) => {
        handleSuccessRes(response, request, dispatch, () => {});
      })
      .catch(error => {
        handleErrorRes(error, request, dispatch);
      });
  };

export const onGoogleSignInCall =
  (request: any): ThunkAction<void, RootState, unknown, AnyAction> =>
  async dispatch => {
    dispatchAction(dispatch, IS_LOADING, true);
    return makeAPIRequest({
      method: POST,
      url: API.googleSignin,
      data: request?.data,
    })
      .then(async (response: any) => {
        handleSuccessRes(response, request, dispatch, () => {});
      })
      .catch(error => {
        handleErrorRes(error, request, dispatch);
      });
  };

export const onAppleSignInCall =
  (request: any): ThunkAction<void, RootState, unknown, AnyAction> =>
  async dispatch => {
    dispatchAction(dispatch, IS_LOADING, true);
    return makeAPIRequest({
      method: POST,
      url: API.appleSignin,
      data: request?.data,
    })
      .then(async (response: any) => {
        handleSuccessRes(response, request, dispatch, () => {});
      })
      .catch(error => {
        handleErrorRes(error, request, dispatch);
      });
  };
