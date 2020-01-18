import { ActionType, getType } from "typesafe-actions";
import { Reducer } from "redux";

import { Location } from "../../utils/types/location";

import * as actions from "./actions";

export interface LocationState {
  address?: Location;
}

export const initialLocation: LocationState = {
  address: undefined
};

export const reducerLocation: Reducer<LocationState, LocationActions> = (
  state = initialLocation,
  action
) => {
  switch (action.type) {
    case getType(actions.locationSet):
      return {
        ...state,
        address: action.payload
      };
    default:
      return state;
  }
};

export type LocationActions = ActionType<typeof actions>;
