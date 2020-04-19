import React, { useState } from 'react'
import { usePopper } from 'react-popper'

type Props = {
  children: React.ReactNode
  refEl: HTMLElement
  hover: boolean
}

const hide = {
  display: 'none',
}

export const PopupContent = ({ children, refEl, hover }: Props) => {
  const [popperElement, setPop] = useState<HTMLDivElement | null>(null)
  const [arrowElement, setAr] = useState<HTMLDivElement | null>(null)

  const { styles, attributes } = usePopper(refEl, popperElement, {
    modifiers: [{ name: 'arrow', options: { element: arrowElement } }],
  })

  return (
    <>
      <div
        ref={setPop}
        style={{ ...styles.popper, ...(!hover && hide) }}
        {...attributes.popper}
      >
        {children}
        <div ref={setAr} style={styles.arrow} />
      </div>
    </>
  )
}
