import { AppThunk } from './../rootReducer'
import { User } from './../../utils/types/user'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { apiCall } from '../apiCall'

type State = User | null

const initialState = null

const slice = createSlice({
  name: 'user',
  initialState: initialState as State,
  reducers: {
    userSet: (state, action: PayloadAction<User | null>) => action.payload,
  },
})

const { userSet } = slice.actions

export const userGet = (): AppThunk => async (...params) => {
  const dispatch = params[0]
  dispatch(userSet(null))
  const user = await apiCall<User>(params, { url: 'user', noError: true })
  dispatch(userSet(user))
}

export const userLogout = (): AppThunk => async (...params) => {
  const dispatch = params[0]
  dispatch(userSet(null))
  await apiCall<User>(params, { url: 'auth/logout' })
}

export default slice.reducer
