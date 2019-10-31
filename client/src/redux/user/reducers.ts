import { ActionType, getType } from "typesafe-actions";
import { Reducer } from "redux";

import { pending, rejected, StateCommon } from "../utils/common";
import { User } from "../../types/user";

import * as actions from "./actions";

export interface UserState extends StateCommon {
  user?: User;
}

export const initialUser: UserState = {
  user: undefined,
  pending: false,
  error: false
};

export const reducerUser: Reducer<UserState, UserActions> = (
  state = initialUser,
  action
) => {
  switch (action.type) {
    case getType(actions.userGetAsync.request):
      return pending(state);
    case getType(actions.userGetAsync.failure):
      return rejected(state);
    case getType(actions.userGetAsync.success):
      return {
        ...state,
        user: action.payload,
        pending: false
      };
    case getType(actions.userLogout):
      return {
        ...state,
        user: undefined
      };
    default:
      return state;
  }
};

export type UserActions = ActionType<typeof actions>;
