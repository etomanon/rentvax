import React, { useState, useEffect, useCallback } from 'react'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete'
import { useDispatch } from 'react-redux'

import {
  PlaceSuggestionWrapper,
  PlaceSuggestionItem,
  PlacesContainer,
} from './styled/Place'
import { Input } from './styled/Input'
import { locationSet } from '../../redux/location'
import { Loader } from '../loader/styled/Loader'
import { callAsyncAction } from '../../utils/func/callAsyncAction'
import { ErrorMessage } from './styled/ErrorMessage'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

export const ADRESS_TYPES_FILTER = ['street_address', 'premise']
type PlaceError =
  | 'ZERO_RESULTS'
  | 'OVER_QUERY_LIMIT'
  | 'REQUEST_DENIED'
  | 'INVALID_REQUEST'
  | 'UNKNOWN_ERROR'

interface PlaceProps {
  onSelect?: (formatted_address: string, place_id: string) => void
  filterPredictions?: boolean
  initAddress?: {
    formatted_address: string
    place_id: string
  }
  error?: string
  placeholder?: string
}

export const Place: React.FC<PlaceProps> = ({
  onSelect,
  filterPredictions = true,
  initAddress,
  error,
  placeholder,
}) => {
  const { t } = useTranslation('common')
  const dispatch = useDispatch()
  const [address, setAddress] = useState('')
  const onChange = (address: string) => {
    if (address === '') {
      dispatch(locationSet(undefined))
    }

    setAddress(address)
  }

  const onSelectHandler = useCallback(
    async (address: string, placeId: null | string) => {
      if (placeId === null) {
        return
      }
      callAsyncAction(async () => {
        const results = await geocodeByAddress(address)
        const result = results[0]
        const { place_id, formatted_address, types } = result
        const latLng = await getLatLng(result)
        setAddress(formatted_address)
        dispatch(
          locationSet({
            place_id,
            formatted_address,
            types,
            latLng,
          })
        )
        onSelect && onSelect(formatted_address, placeId)
      })
    },
    [dispatch, onSelect]
  )

  useEffect(() => {
    if (initAddress) {
      onSelectHandler(initAddress.formatted_address, initAddress.place_id)
    }
  }, [initAddress, onSelectHandler])

  const onError = useCallback(
    (status: string, clearSuggestions: () => void) => {
      const placeError = status as PlaceError
      if (placeError === 'OVER_QUERY_LIMIT') {
        toast.error(t('queryError'), { autoClose: 10000 })
      }
      clearSuggestions()
    },
    [t]
  )

  return (
    <>
      <PlacesAutocomplete
        debounce={700}
        value={address}
        onError={onError}
        onChange={onChange}
        onSelect={onSelectHandler}
        highlightFirstSuggestion
        searchOptions={
          {
            types: filterPredictions ? undefined : ['address'],
            // componentRestrictions: { country: 'cz' },
          } as any
        }
        // @ts-ignore
        filterPredictions={(prediction) => {
          if (filterPredictions) {
            return true
          }
          return prediction.types.some(
            (p: string) => ADRESS_TYPES_FILTER.findIndex((f) => f === p) !== -1
          )
        }}
        // use Google api only if numbers are present in input
        // @ts-ignore
        numbersOnly={!filterPredictions}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <PlacesContainer>
            <Input
              {...getInputProps({
                placeholder: placeholder ?? 'Rooseveltova 42',
                className: 'location-search-input',
              })}
              error={error ? true : false}
            />
            <PlaceSuggestionWrapper>
              {loading && <Loader mt=".5rem" static />}
              {suggestions.map((suggestion) => {
                return (
                  <PlaceSuggestionItem
                    key={suggestion.id}
                    {...getSuggestionItemProps(suggestion, {
                      active: suggestion.active,
                    })}
                  >
                    {suggestion.description}
                  </PlaceSuggestionItem>
                )
              })}
            </PlaceSuggestionWrapper>
          </PlacesContainer>
        )}
      </PlacesAutocomplete>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </>
  )
}
