import { ActionType } from './action.types';
import { User } from './user.reducer';
import { Dispatch } from 'redux';
import { Action } from './user.actions';
import axios from 'axios';

const loginApiUrl =
  process.env.REACT_APP_API_ADDRESS + 'flowerPower/login/check';
const getShipmentApiUrl = (userId: string) =>
  `${process.env.REACT_APP_API_ADDRESS}/flowerPower/customer/get/clientInfoForOrder/${userId}`;

export const logInUser = (user: User) => {
  return async (dispatch: Dispatch<Action>) => {
    function onSuccess(userData: User) {
      dispatch({ type: ActionType.LOGIN_SUCCESSFUL, payload: user });
      return userData;
    }
    function onError(errorMessage: string) {
      dispatch({ type: ActionType.LOGIN_ERROR, payload: errorMessage });
      return errorMessage;
    }
    try {
      dispatch({ type: ActionType.START_FETCHING });
      const { data } = await axios.post(loginApiUrl, {
        email: user?.email,
        password: user?.password,
      });
      user!.id = data;
      const response = await axios.get(getShipmentApiUrl(user?.id!));
      user!.name = response.data.name;
      user!.surname = response.data.surname;
      user!.zipCode = response.data.zip;
      user!.street = response.data.address;
      user!.city = response.data.city;

      return onSuccess(user);
    } catch (e) {
      return onError(e.response.data);
    }
  };
};

export const logOutUser = () => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.LOGOUT,
    });
  };
};

export const clearLoginData = () => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.CLEAR_LOGIN_DATA });
  };
};
