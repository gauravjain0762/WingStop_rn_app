import {ThunkAction} from 'redux-thunk';
import {AnyAction} from 'redux';

import {API, GET} from '../../utils/apiConstant';
import {
  handleErrorRes,
  handleSuccessRes,
  makeAPIRequest,
  requestProps,
} from '../../utils/apiGlobal';
import {dispatchAction, RootState} from '../hooks';
import {IS_LOADING} from '../actionTypes';

export const onGetDashboard =
  (request: requestProps): ThunkAction<void, RootState, unknown, AnyAction> =>
  async dispatch => {
    dispatchAction(dispatch, IS_LOADING, true);
    return makeAPIRequest({
      method: GET,
      url: API.getDashboard,
    })
      .then(async (response: any) => {
        handleSuccessRes(response, request, dispatch, async () => {});
      })
      .catch(error => {
        handleErrorRes(error, request, dispatch);
      });
  };

export const onGetPromotions =
  (request: requestProps): ThunkAction<void, RootState, unknown, AnyAction> =>
  async dispatch => {
    dispatchAction(dispatch, IS_LOADING, true);
    return makeAPIRequest({
      method: GET,
      url: API.getPromotions,
    })
      .then(async (response: any) => {
        handleSuccessRes(response, request, dispatch, async () => {});
      })
      .catch(error => {
        handleErrorRes(error, request, dispatch);
      });
  };
