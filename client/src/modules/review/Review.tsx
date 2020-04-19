import React, { useEffect, useState, useMemo } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import * as Yup from 'yup'

import { useSelectorApp } from '@/redux'
import { Formik, Form } from 'formik'
import { Text } from '@/components/text/styled/Text'
import { Flex } from '@/components/grid/Flex'
import { Box } from '@rebass/grid'
import { TextArea } from '@/components/formik/TextArea'
import { Rating } from '@/components/formik/Rating'
import { Button } from '@/components/button/styled/Button'
import { callApi } from '@/utils/func/callApi'
import { ADRESS_TYPES_FILTER, Place } from '@/components/formik/Place'

interface FormValues {
  address?: string
  rating?: number
  description: string
  geom: object
}

export const Review = () => {
  const address = useSelectorApp(state => state.location.address)
  const [error, setError] = useState<string | undefined>(undefined)
  const addressValid = useMemo(
    () =>
      address &&
      address.types.some(
        t => ADRESS_TYPES_FILTER.findIndex(f => f === t) !== -1
      ),
    [address]
  )

  useEffect(() => {
    if (addressValid) {
      setError(undefined)
    } else {
      setError(
        'Vyberte prosím přesnou adresu s číslem popisným - např. napište Roosveltova 42 a poté vyberte adresu ze seznamu'
      )
    }
  }, [addressValid])
  return (
    <>
      <Box width={1}>
        <Flex flexDirection="column" width={1} alignItems="center" my={3}>
          <Text color="secondary" fontSize={4}>
            Vaše recenze
          </Text>
          <Flex width={[1, 0.75, 0.5]} flexDirection="column" mt={3}>
            <Place
              filterPredictions={false}
              initAddress={address?.formatted_address}
              error={error}
            />
          </Flex>
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
            if (!addressValid) {
              setSubmitting(false)
              return
            }
            callApi({
              url: 'review',
              method: 'POST',
              body: values,
            })
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
