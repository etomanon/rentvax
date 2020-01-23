import React, { useMemo, useState } from "react";
import { GoogleMap } from "@react-google-maps/api";
import { useSelector } from "react-redux";
import { selectorLocation } from "../../redux/location/selectors";
import { SearchLoader } from "./SearchLoader";
import useGeolocation from "../../utils/hooks/useGeolocation";
import { Place } from "../../components/formik/Place";
import { Flex } from "../../components/grid/Flex";

const prague = { lat: 50.0755381, lng: 14.4378005 };

export const Search: React.FC = () => {
  const location = useSelector(selectorLocation);
  const locationCenter = location.address?.latLng;
  const geo = useGeolocation();

  const center: any = useMemo(() => {
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
        <Flex>
          <GoogleMap
            id="mapId"
            mapContainerStyle={{
              height: "60rem",
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
          </GoogleMap>
          <Flex width={0.3333} flexDirection="column">
            <Flex mx={"auto"}>
              <Place />
            </Flex>
          </Flex>
        </Flex>
      )}
    </>
  );
};
