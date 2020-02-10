import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

import { loadingAdd, loadingRemove } from '../../redux/loading'

export const useAsyncAction = <T>(action: () => Promise<T>) => {
  const [result, setResult] = useState<null | T>(null)
  const isMounted = React.useRef(true)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadingAdd())
    action()
      .then(data => {
        dispatch(loadingRemove())
        if (!isMounted) return
        setResult(data)
      })
      .catch(e => {
        dispatch(loadingRemove())
        toast.error(e)
      })
    return () => {
      isMounted.current = false
    }
  })
  return result
}
