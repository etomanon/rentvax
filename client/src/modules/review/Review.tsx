import React, { useEffect } from 'react'
import { RouteComponentProps, Redirect } from 'react-router-dom'
import * as Yup from 'yup'

import { useSelectorApp } from '@/redux'
import { Formik, Form } from 'formik'
import { Text } from '@/components/text/styled/Text'
import { TextSubtitle } from '@/components/text/styled/TextSubtitle'
import { Flex } from '@/components/grid/Flex'
import { Box } from '@rebass/grid'
import { TextArea } from '@/components/formik/TextArea'
import { Rating } from '@/components/formik/Rating'
import { Button } from '@/components/button/styled/Button'
import { callAsyncAction } from '@/utils/func/callAsyncAction'
import { api } from '@/utils/api/api'

interface FormValues {
  address?: string
  rating?: number
  description: string
  geom: object
}

export const Review: React.FC<RouteComponentProps> = () => {
  const address = useSelectorApp(state => state.location.address)

  return (
    <>
      {!address && <Redirect to="/" />}
      <Box width={1}>
        <Flex flexDirection="column" width={1} alignItems="center" my={3}>
          <Text color="primary" fontSize={4}>
            Vaše recenze
          </Text>
          <TextSubtitle textAlign="center">
            {address?.formatted_address}
          </TextSubtitle>
        </Flex>
        <Formik<FormValues>
          initialValues={{
            address: address?.formatted_address,
            rating: undefined,
            description: '',
            geom: {
              type: 'Point',
              coordinates: [address?.latLng.lng, address?.latLng.lat],
            },
          }}
          validationSchema={Yup.object({
            address: Yup.string().required('Povinné'),
            rating: Yup.number()
              .required('Povinné')
              .oneOf([1, 2, 3, 4, 5], 'Neplatná hodnota hodnocení'),
            description: Yup.string()
              .max(5000, 'Max 5 000 znaků')
              .required('Povinné'),
            geom: Yup.object({
              type: Yup.string(),
              coordinates: Yup.array(),
            }).required('Povinné'),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            callAsyncAction(
              api({
                url: 'review',
                method: 'POST',
                body: JSON.stringify(values),
              })
            )
            setSubmitting(false)
          }}
        >
          <Form>
            <Flex alignItems="center" flexDirection="column">
              <Flex width={[1, 0.75, 0.5]}>
                <Rating label="Hodnocení" name="rating" />
              </Flex>
              <Flex width={[1, 0.75, 0.5]}>
                <TextArea label="Recenze" name="description" rows={10} />
              </Flex>
              <Button variant="filled" type="submit" mt={3}>
                Vytvořit recenzi
              </Button>
            </Flex>
          </Form>
        </Formik>
      </Box>
    </>
  )
}
