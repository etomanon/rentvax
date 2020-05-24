import React from 'react'

import { Loader } from './styled/Loader'
import { useSelectorApp } from '@/redux'

export const GlobalLoader: React.FC = () => {
  const loading = useSelectorApp((state) => state.loading)
  return <>{loading > 0 ? <Loader /> : null}</>
}
