import React from "react";
import { GoogleMap } from "@react-google-maps/api";
import { useSelector } from "react-redux";
import { selectorLocation } from "../../redux/location/selectors";

export const Search: React.FC = () => {
  const location = useSelector(selectorLocation);
  const center = location.address?.latLng;
  return (
    <GoogleMap
      id="example-map"
      mapContainerStyle={{
        height: "400px",
        width: "800px"
      }}
      // TODO: Calculate default zoom
      zoom={7}
      center={center}
    ></GoogleMap>
  );
};
