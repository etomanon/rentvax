import { AppThunk } from './../rootReducer'
import { User } from './../../utils/types/user'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { callApi } from '@/utils/func/callApi'

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
  const user = await callApi<User>({ url: 'user', noError: true })
  dispatch(userSet(user))
}

export const userLogout = (): AppThunk => async dispatch => {
  dispatch(userSet(null))
  await callApi<null>({ url: 'auth/logout' })
}

export default slice.reducer
