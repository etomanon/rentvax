import location from './location'
import loading from './loading'
import user from './user'

import { combineReducers, Action } from 'redux'
import { ThunkAction } from 'redux-thunk'

const rootReducer = combineReducers({
  location,
  loading,
  user,
})

export type RootState = ReturnType<typeof rootReducer>

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>

export type AppThunkParams = Parameters<AppThunk>

export default rootReducer
