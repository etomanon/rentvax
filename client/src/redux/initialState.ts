import { initialUser, UserState } from "./user/reducers";
import { initialLocation, LocationState } from "./location/reducers";

// Initial state for store
export const initialState = {
  user: initialUser,
  location: initialLocation
};

export interface AppState {
  user: Readonly<UserState>;
  location: Readonly<LocationState>;
}
