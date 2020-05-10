import { AppThunkParams } from './rootReducer'
import { api, ApiProps } from '@/utils/api/api'
import { loadingAdd, loadingRemove } from './loading'

export const apiCall = async <T>(thunk: AppThunkParams, apiProps: ApiProps) => {
  const dispatch = thunk[0]
  try {
    dispatch(loadingAdd())
    const result = await api<T>(apiProps)
    dispatch(loadingRemove())
    return result
  } catch (e) {
    dispatch(loadingRemove())
    return null
  }
}
