import { initialUser, UserState } from "./user/reducers";

// Initial state for store
export const initialState = {
  user: initialUser
};

export interface AppState {
  user: Readonly<UserState>;
}
