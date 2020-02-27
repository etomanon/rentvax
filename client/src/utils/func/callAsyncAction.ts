import store from '../../redux/store'
import { loadingAdd, loadingRemove } from '../../redux/loading'

export const callAsyncAction = async <T>(
  action: (() => Promise<T | null>) | Promise<T | null>
) => {
  const { dispatch } = store
  try {
    dispatch(loadingAdd())
    const result = typeof action === 'function' ? await action() : action
    dispatch(loadingRemove())
    return result
  } catch (e) {
    dispatch(loadingRemove())
    return null
  }
}
