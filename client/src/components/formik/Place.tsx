import React, { useState } from 'react'
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

interface PlaceProps {
  onSelect?: () => void
}

export const Place: React.FC<PlaceProps> = ({ onSelect }) => {
  const dispatch = useDispatch()
  const [address, setAddress] = useState('')
  const onChange = (address: string) => {
    // dispatch(locationSet(undefined));
    setAddress(address)
  }

  const onSelectHandler = async (address: string, placeId: null | string) => {
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
      onSelect && onSelect()
    })
  }
  return (
    <>
      <PlacesAutocomplete
        debounce={350}
        value={address}
        onChange={onChange}
        onSelect={onSelectHandler}
        searchOptions={{
          types: ['address'],
          componentRestrictions: { country: 'cz' },
        }}
        // @ts-ignore
        filterPredictions={prediction => {
          return prediction.types.some(
            (p: string) => p === 'street_address' || p === 'premise'
          )
        }}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <PlacesContainer>
            <Input
              {...getInputProps({
                placeholder: 'Rooseveltova 42',
                className: 'location-search-input',
              })}
            />
            <PlaceSuggestionWrapper>
              {loading && <Loader mt=".5rem" static />}
              {suggestions.map(suggestion => {
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
    </>
  )
}
