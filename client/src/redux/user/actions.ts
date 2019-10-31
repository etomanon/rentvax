import { createAsyncAction, createAction } from "typesafe-actions";
import { Dispatch } from "redux";

import ky from "../../ky/ky";
import { User } from "../../types/user";

export const userLogout = createAction("USER_LOGOUT");

export const userGetAsync = createAsyncAction(
  "USER_GET_REQUEST",
  "USER_GET_SUCCESS",
  "USER_GET_FAILURE"
)<void, User, void>();

export const userRequest = async (): Promise<User | null> => {
  try {
    const user = await ky.get("user").json<User>();
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const userGet = () => async (dispatch: Dispatch) => {
  // Start request
  dispatch(userGetAsync.request());
  // Get data
  const user = await userRequest();
  // Check data
  if (user) {
    dispatch(userGetAsync.success(user));
  } else {
    dispatch(userGetAsync.failure());
  }
};
