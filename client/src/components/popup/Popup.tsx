import React, { useState, useEffect } from 'react'
import { PopupContent } from './PopupContent'

type Props = {
  children: React.ReactNode
  refEl: HTMLElement | null
}

export const Popup = ({ children, refEl }: Props) => {
  const [hover, setHover] = useState(false)

  const onEnter = () => {
    setHover(true)
  }
  const onLeave = () => {
    setHover(false)
  }

  useEffect(() => {
    refEl?.addEventListener('mouseover', onEnter)
    refEl?.addEventListener('mouseleave', onLeave)
    return () => {
      refEl?.removeEventListener('mouseover', onEnter)
      refEl?.removeEventListener('mouseleave', onLeave)
    }
  }, [refEl])

  return (
    <>
      {refEl && (
        <PopupContent refEl={refEl} hover={hover}>
          {children}
        </PopupContent>
      )}
    </>
  )
}
