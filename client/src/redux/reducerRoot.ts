import { combineReducers } from "redux";

import { reducerUser } from "./user/reducers";
import { reducerLocation } from "./location/reducers";
import { reducerLoading } from "./loading/reducers";

export const reducerRoot = combineReducers({
  user: reducerUser,
  location: reducerLocation,
  loading: reducerLoading
});
