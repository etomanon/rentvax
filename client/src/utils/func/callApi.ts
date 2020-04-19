import store from '../../redux/store'
import { loadingAdd, loadingRemove } from '../../redux/loading'
import { api, ApiProps } from '../api/api'

export const callApi = async <T>(apiProps: ApiProps) => {
  const { dispatch } = store
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
