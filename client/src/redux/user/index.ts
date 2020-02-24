import { AppThunk } from './../rootReducer'
import { callAsyncAction } from './../../utils/func/callAsyncAction'
import { api } from './../../utils/api/api'
import { User } from './../../utils/types/user'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

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

export const userGet = (): AppThunk => async dispatch => {
  const user = await callAsyncAction(
    api<User>({ url: 'user' })
  )
  dispatch(userSet(user))
}

export const userLogout = (): AppThunk => async dispatch => {
  dispatch(userSet(null))
  await callAsyncAction(
    api<null>({ url: 'auth/logout' })
  )
}

export default slice.reducer
