import React from 'react'
import TooltipTrigger from 'react-popper-tooltip'
import 'react-popper-tooltip/dist/styles.css'

type Trigger = 'click' | 'right-click' | 'hover' | 'focus' | 'none'

type Props = {
  tooltip: React.ReactNode
  children: React.ReactNode
  hideArrow?: boolean
  placement?:
    | 'auto-start'
    | 'auto'
    | 'auto-end'
    | 'top-start'
    | 'top'
    | 'top-end'
    | 'right-start'
    | 'right'
    | 'right-end'
    | 'bottom-end'
    | 'bottom'
    | 'bottom-start'
    | 'left-end'
    | 'left'
    | 'left-start'
  trigger?: Trigger | Trigger[]
  fullWidth?: boolean
}

export const Tooltip = ({
  children,
  tooltip,
  placement = 'top',
  hideArrow,
  fullWidth,
  ...props
}: Props) => (
  <TooltipTrigger
    {...props}
    placement={placement}
    tooltip={({
      arrowRef,
      tooltipRef,
      getArrowProps,
      getTooltipProps,
      placement,
    }) => (
      <div
        {...getTooltipProps({
          ref: tooltipRef,
          className: 'tooltip-container',
        })}
      >
        {!hideArrow && (
          <div
            {...getArrowProps({
              ref: arrowRef,
              className: 'tooltip-arrow',
              'data-placement': placement,
            })}
          />
        )}
        {tooltip}
      </div>
    )}
  >
    {({ getTriggerProps, triggerRef }) => (
      <span
        {...getTriggerProps({
          ref: triggerRef,
          className: 'trigger',
        })}
        style={fullWidth ? { width: '100%' } : undefined}
      >
        {children}
      </span>
    )}
  </TooltipTrigger>
)
