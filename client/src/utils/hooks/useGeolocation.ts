import { useEffect, useState, useRef, useCallback } from "react";

export interface GeoLocationSensorState {
  loading: boolean;
  accuracy: number | null;
  altitude: number | null;
  altitudeAccuracy: number | null;
  heading: number | null;
  latitude: number | null;
  longitude: number | null;
  speed: number | null;
  timestamp: number | null;
  error?: Error | PositionError;
}

export const useGeolocation = (
  options?: PositionOptions
): GeoLocationSensorState => {
  const [state, setState] = useState<GeoLocationSensorState>({
    loading: true,
    accuracy: null,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    latitude: null,
    longitude: null,
    speed: null,
    timestamp: Date.now()
  });
  let mounted = useRef(true);

  const onEvent = useCallback((event: any) => {
    if (mounted.current) {
      setState({
        loading: false,
        accuracy: event.coords.accuracy,
        altitude: event.coords.altitude,
        altitudeAccuracy: event.coords.altitudeAccuracy,
        heading: event.coords.heading,
        latitude: event.coords.latitude,
        longitude: event.coords.longitude,
        speed: event.coords.speed,
        timestamp: event.timestamp
      });
    }
  }, []);
  const onEventError = (error: PositionError) =>
    mounted.current &&
    setState(oldState => ({ ...oldState, loading: false, error }));

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onEvent, onEventError, options);

    return () => {
      mounted.current = false;
    };
  }, [onEvent, options]);

  return state;
};
