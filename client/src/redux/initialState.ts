import { initialUser, UserState } from "./user/reducers";
import { initialLocation, LocationState } from "./location/reducers";
import { initialLoading, LoadingState } from "./loading/reducers";

// Initial state for store
export const initialState = {
  user: initialUser,
  location: initialLocation,
  loading: initialLoading
};

export interface AppState {
  user: Readonly<UserState>;
  location: Readonly<LocationState>;
  loading: Readonly<LoadingState>;
}
