import { ActionType, getType } from "typesafe-actions";
import { Reducer } from "redux";

import * as actions from "./actions";

export type LoadingState = number;

export const initialLoading: LoadingState = 0;

export const reducerLoading: Reducer<LoadingState, LoadingActions> = (
  state = initialLoading,
  action
) => {
  switch (action.type) {
    case getType(actions.loadingAdd):
      return state + 1;
    case getType(actions.loadingRemove):
      return state - 1;
    default:
      return state;
  }
};

export type LoadingActions = ActionType<typeof actions>;
