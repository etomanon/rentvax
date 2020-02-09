import React, { useMemo, useState, useRef } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  OverlayView
} from "@react-google-maps/api";
import { SearchLoader } from "./SearchLoader";
import { useGeolocation } from "../../utils/hooks/useGeolocation";
import { Place } from "../../components/formik/Place";
import { Flex } from "../../components/grid/Flex";
import { Text } from "../../components/text/styled/Text";
import { Pin } from "styled-icons/boxicons-solid/Pin";
import styled from "styled-components";
import { TextSubtitle } from "../../components/text/styled/TextSubtitle";
import { useResize } from "../../utils/hooks/useResize";
import { useSelectorApp } from "src/redux";

const Icon = styled(Pin);

const prague = { lat: 50.0755381, lng: 14.4378005 };

export const Search: React.FC = () => {
  const location = useSelectorApp(state => state.location);
  const locationCenter = location.address?.latLng;
  const geo = useGeolocation();
  const { ref, height } = useResize();
  const center = useMemo(() => {
    return locationCenter
      ? locationCenter
      : geo.error
      ? prague
      : geo.latitude && geo.longitude
      ? { lat: geo.latitude, lng: geo.longitude }
      : prague;
  }, [geo.error, geo.latitude, geo.longitude, locationCenter]);

  return (
    <>
      {window.google.maps && (
        <Flex ref={ref} flex="1">
          <GoogleMap
            id="mapId"
            mapContainerStyle={{
              height: height + "px",
              width: "66.3333%"
            }}
            options={{
              styles: [
                {
                  featureType: "poi",
                  elementType: "labels",
                  stylers: [{ visibility: "off" }]
                }
              ]
            }}
            zoom={16}
            center={center}
          >
            <SearchLoader />
            {center !== prague && (
              <>
                <Marker position={center} />
              </>
            )}
          </GoogleMap>
          <Flex width={0.3333} flexDirection="column" mx={2}>
            {location.address?.formatted_address && (
              <Flex mb={2} alignItems="center">
                <TextSubtitle>Vybraná adresa:</TextSubtitle>&nbsp;
                <Text fontWeight={500}>
                  {location.address?.formatted_address}
                </Text>
              </Flex>
            )}
            <Place />
          </Flex>
        </Flex>
      )}
    </>
  );
};
