import React, { useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";

import { PlaceSuggestionWrapper, PlaceSuggestionItem } from "./styled/Place";
import { Input } from "./styled/Input";
import { locationSet } from "../../redux/location/actions";
import { Loader } from "../loader/styled/Loader";

export const Place: React.FC = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");
  const onChange = (address: string) => {
    setAddress(address);
  };

  const onSelect = async (address: string) => {
    try {
      setLoading(true);
      const results = await geocodeByAddress(address);
      const result = results[0];
      const { place_id, formatted_address, types } = result;
      const latLng = await getLatLng(result);
      dispatch(
        locationSet({
          place_id,
          formatted_address,
          types,
          latLng
        })
      );
      enqueueSnackbar("Success", { variant: "success" });
      setLoading(false);
    } catch (e) {
      setLoading(false);
      enqueueSnackbar(e, { variant: "error" });
    }
  };
  return (
    <>
      {loading && <Loader />}
      <PlacesAutocomplete
        value={address}
        onChange={onChange}
        onSelect={onSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <Input
              {...getInputProps({
                placeholder: "Praha Rooseveltova 42",
                className: "location-search-input"
              })}
            />
            <PlaceSuggestionWrapper>
              {loading && <Loader mt=".5rem" local />}
              {suggestions.map(suggestion => {
                return (
                  <PlaceSuggestionItem
                    key={suggestion.id}
                    {...getSuggestionItemProps(suggestion, {
                      active: suggestion.active
                    })}
                  >
                    {suggestion.description}
                  </PlaceSuggestionItem>
                );
              })}
            </PlaceSuggestionWrapper>
          </div>
        )}
      </PlacesAutocomplete>
    </>
  );
};
