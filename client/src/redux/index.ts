import { RootState } from './rootReducer'
import store from './store'
import {
  useSelector as useSelectorRedux,
  TypedUseSelectorHook,
} from 'react-redux'

export const useSelectorApp: TypedUseSelectorHook<RootState> = useSelectorRedux

export type AppDispatch = typeof store.dispatch
