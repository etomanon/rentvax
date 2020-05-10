import { loadingAdd, loadingRemove } from '../../redux/loading'
import { api, ApiProps } from './api'
import { useDispatch } from 'react-redux'
import { useCallback } from 'react'

export const useApi = () => {
  const dispatch = useDispatch()

  const apiCall = useCallback(
    async <T>(apiProps: ApiProps) => {
      try {
        dispatch(loadingAdd())
        const result = await api<T>(apiProps)
        dispatch(loadingRemove())
        return result
      } catch (e) {
        dispatch(loadingRemove())
        return null
      }
    },
    [dispatch]
  )

  return apiCall
}
