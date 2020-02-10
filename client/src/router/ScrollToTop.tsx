import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export const ScrollToTop: React.FC = ({ children }) => {
  const { pathname } = useLocation()
  useEffect(() => {
    document.body.scrollTop = 0
  }, [pathname])

  return <>{children}</>
}
