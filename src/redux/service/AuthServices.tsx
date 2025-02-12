import { ThunkAction } from "redux-thunk";
import { dispatchAction, RootState } from "../hooks";
import { AnyAction } from "redux";
import { IS_LOADING } from "../actionTypes";
import {
  handleErrorRes,
  handleSuccessRes,
  makeAPIRequest,
} from "../../utils/apiGlobal";
import { API, POST } from "../../utils/apiConstant";

export const onUserLogin =
  (request: any): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    dispatchAction(dispatch, IS_LOADING, true);
    return makeAPIRequest({ method: POST, url: API.login, data: request?.data })
      .then(async (response: any) => {
        handleSuccessRes(response, request, dispatch, () => {
          // successToast(response?.data?.message)
          // dispatchAction(dispatch, SET_USER_INFO, response?.data?.data?.user)
        });
      })
      .catch((error) => {
        handleErrorRes(error, request, dispatch);
      });
  };
