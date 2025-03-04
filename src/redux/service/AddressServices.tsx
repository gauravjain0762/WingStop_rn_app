import {ThunkAction} from 'redux-thunk';
import {AnyAction} from 'redux';

import {successToast} from '../../utils/commonFunction';
import {API, GET, POST} from '../../utils/apiConstant';
import {
  handleErrorRes,
  handleSuccessRes,
  makeAPIRequest,
} from '../../utils/apiGlobal';
import {dispatchAction, RootState} from '../hooks';
import {IS_LOADING, SET_USER_ADDRESS} from '../actionTypes';

interface requestProps {
  data?: any;
  params?: any;
  onSuccess?: (res: any) => void;
  request?: (res: any) => void;
}

export const addAddressApi =
  (request: requestProps): ThunkAction<void, RootState, unknown, AnyAction> =>
  async dispatch => {
    dispatchAction(dispatch, IS_LOADING, true);
    return makeAPIRequest({
      data: request?.data,
      method: POST,
      url: API.addAddress,
    })
      .then(async (response: any) => {
        handleSuccessRes(response, request, dispatch, async () => {
          successToast(response?.data?.message);
        });
      })
      .catch(error => {
        handleErrorRes(error, request, dispatch);
      });
  };

export const getUserAddressApi =
  (request: requestProps): ThunkAction<void, RootState, unknown, AnyAction> =>
  async dispatch => {
    return makeAPIRequest({
      method: GET,
      url: API.getUserAddress,
    })
      .then(async (response: any) => {
        handleSuccessRes(response, request, dispatch, async () => {
          dispatchAction(dispatch, SET_USER_ADDRESS, response?.data?.data);
        });
      })
      .catch(error => {
        handleErrorRes(error, request, dispatch);
      });
  };

export const markDefaultAddressApi =
  (request: requestProps): ThunkAction<void, RootState, unknown, AnyAction> =>
  async dispatch => {
    dispatchAction(dispatch, IS_LOADING, true);
    return makeAPIRequest({
      data: request?.data,
      method: POST,
      url: API.makeAddressDefault,
    })
      .then(async (response: any) => {
        handleSuccessRes(response, request, dispatch, async () => {
          dispatch(getUserAddressApi({}));
        });
      })
      .catch(error => {
        handleErrorRes(error, request, dispatch);
      });
  };

export const deleteAddressApi =
  (request: requestProps): ThunkAction<void, RootState, unknown, AnyAction> =>
  async dispatch => {
    dispatchAction(dispatch, IS_LOADING, true);
    return makeAPIRequest({
      data: request?.data,
      method: POST,
      url: API.removeAddress,
    })
      .then(async (response: any) => {
        handleSuccessRes(response, request, dispatch, async () => {
          dispatch(getUserAddressApi({}));
        });
      })
      .catch(error => {
        handleErrorRes(error, request, dispatch);
      });
  };

export const updateAddressApi =
  (request: requestProps): ThunkAction<void, RootState, unknown, AnyAction> =>
  async dispatch => {
    dispatchAction(dispatch, IS_LOADING, true);
    return makeAPIRequest({
      data: request?.data,
      method: POST,
      url: API.updateAddress,
    })
      .then(async (response: any) => {
        handleSuccessRes(response, request, dispatch, async () => {
          successToast(response?.data?.message);
          dispatch(getUserAddressApi({}));
        });
      })
      .catch(error => {
        handleErrorRes(error, request, dispatch);
      });
  };
