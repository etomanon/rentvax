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

interface FormValues {
  address?: string
  rating: number | null
  description: string
  location: object
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
          <TextSubtitle>{address?.formatted_address}</TextSubtitle>
        </Flex>
        <Formik<FormValues>
          initialValues={{
            address: address?.formatted_address,
            rating: null,
            description: '',
            location: {
              type: 'Point',
              coordinates: [address?.latLng.lng, address?.latLng.lat],
            },
          }}
          validationSchema={Yup.object({
            address: Yup.string().required('Povinné'),
            rating: Yup.number()
              .required('Povinné')
              .oneOf([0, 1, 2, 3, 4], 'Neplatná hodnota hodnocení'),
            description: Yup.string()
              .max(5000, 'Max 5 000 znaků')
              .required('Povinné'),
            location: Yup.object({
              type: Yup.string(),
              coordinates: Yup.array(),
            }).required('Povinné'),
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2))
              setSubmitting(false)
            }, 400)
          }}
        >
          <Form>
            <Flex justifyContent="center">
              <Flex width={0.5}>
                <TextArea label="Recenze" name="description" rows={10} />
              </Flex>
            </Flex>
          </Form>
        </Formik>
      </Box>
    </>
  )
}
