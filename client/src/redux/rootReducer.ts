import location from "./location";
import loading from "./loading";
import user from "./user";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  location,
  loading,
  user
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
