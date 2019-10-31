import { combineReducers } from "redux";

import { reducerUser } from "./user/reducers";

export const reducerRoot = combineReducers({
  user: reducerUser
});
