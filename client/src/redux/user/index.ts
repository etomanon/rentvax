import { User } from './../../utils/types/user'
import { createSlice } from '@reduxjs/toolkit'

type State = User | null

const initialState = null

const slice = createSlice({
  name: 'user',
  initialState: initialState as State,
  reducers: {
    userGet: () => {
      // TODO get if is logged
    },
    userLogout: () => {
      // TODO loggout logic
    },
  },
})

export const { userGet, userLogout } = slice.actions

export default slice.reducer
