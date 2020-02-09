import { User } from "./../../utils/types/user";
import { RootState } from "./../rootReducer";
import { createSlice } from "@reduxjs/toolkit";

type State = User | null;

const initialState = null;

const slice = createSlice({
  name: "user",
  initialState: initialState as State,
  reducers: {
    userGet: () => {
      // TODO get if is logged
    },
    userLogout: () => {
      // TODO loggout
    }
  }
});

export const selectorUser = (state: RootState) => state.user;

export const { userGet, userLogout } = slice.actions;

export default slice.reducer;
