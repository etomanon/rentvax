import { combineReducers } from "redux";

import { reducerUser } from "./user/reducers";
import { reducerLocation } from "./location/reducers";

export const reducerRoot = combineReducers({
  user: reducerUser,
  location: reducerLocation
});
