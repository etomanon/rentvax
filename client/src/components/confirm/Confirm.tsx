import React, { useRef } from 'react'
import TooltipTrigger, { GetTriggerPropsArg, Ref } from 'react-popper-tooltip'
import 'react-popper-tooltip/dist/styles.css'
import { Flex } from '@rebass/grid'
import { Text } from '../text/styled/Text'
import { Button } from '../button/styled/Button'
import { useTranslation } from 'react-i18next'

type Props = {
  onConfirm: () => void
  children: React.ReactNode
  confirmText?: string
}

export const Confirm = ({
  children,
  onConfirm,
  confirmText,
  ...props
}: Props) => {
  const { t } = useTranslation('common')
  const refTrig = useRef<HTMLSpanElement>(null)
  return (
    <TooltipTrigger
      {...props}
      placement="bottom"
      trigger="click"
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
          <div
            {...getArrowProps({
              ref: arrowRef,
              className: 'tooltip-arrow',
              'data-placement': placement,
            })}
          />
          <Flex
            px={1}
            width={'16rem'}
            backgroundColor="#fff"
            alignItems="center"
            justifyContent="space-between"
            flexWrap="wrap"
            style={{ borderRadius: '4px' }}
          >
            <Text width={1} mb={3} mt={3} textAlign="center">
              {confirmText ?? 'Potvrďte'}
            </Text>
            <Button
              width={0.45}
              mb={3}
              variant="filled"
              onClick={() => {
                onConfirm()
                refTrig.current && refTrig.current.click()
              }}
            >
              {t('yes')}
            </Button>
            <Button
              width={0.45}
              mb={3}
              onClick={() => {
                refTrig.current && refTrig.current.click()
              }}
              variant="error"
            >
              {t('no')}
            </Button>
          </Flex>
        </div>
      )}
    >
      {({ getTriggerProps, triggerRef }) => (
        <Trigger
          getTriggerProps={getTriggerProps}
          triggerRef={triggerRef}
          refTrig={refTrig}
        >
          {children}
        </Trigger>
      )}
    </TooltipTrigger>
  )
}

type TriggerProps = {
  children: React.ReactNode
  triggerRef: Ref
  refTrig: Ref
  getTriggerProps(arg?: GetTriggerPropsArg): GetTriggerPropsArg
}

const Trigger = ({
  getTriggerProps,
  triggerRef,
  children,
  refTrig,
}: TriggerProps) => {
  return (
    <span
      {...getTriggerProps({
        ref: triggerRef,
        className: 'trigger',
      })}
    >
      <span ref={refTrig}>{children}</span>
    </span>
  )
}
