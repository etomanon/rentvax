import React, { useEffect, useCallback, useState } from 'react'
import { useGoogleMap } from '@react-google-maps/api'
import { useDebounce } from '../../utils/hooks/useDebounce'

export const SearchLoader: React.FC = () => {
  const [bounds, setBounds] = useState<
    google.maps.LatLngBoundsLiteral | undefined
  >(undefined)
  const boundsDebounced = useDebounce(bounds, 350)
  const map = useGoogleMap()
  const handleChange = useCallback(() => {
    const bounds = map?.getBounds()?.toJSON()
    setBounds(bounds)
  }, [map])
  useEffect(() => {
    map?.addListener('bounds_changed', handleChange)
  }, [handleChange, map])
  useEffect(() => {
    // TODO: Load new reviews for map
  }, [boundsDebounced])
  return null
}
