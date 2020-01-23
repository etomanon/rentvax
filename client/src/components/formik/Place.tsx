import React, { useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import { useDispatch } from "react-redux";

import { PlaceSuggestionWrapper, PlaceSuggestionItem } from "./styled/Place";
import { Input } from "./styled/Input";
import { locationSet } from "../../redux/location/actions";
import { Loader } from "../loader/styled/Loader";
import { callAsyncAction } from "../../utils/func/callAsyncAction";
import { loadingAdd, loadingRemove } from "../../redux/loading/actions";

export const Place: React.FC = () => {
  const dispatch = useDispatch();
  const [address, setAddress] = useState("");
  const onChange = (address: string) => {
    // dispatch(locationSet(undefined));
    setAddress(address);
  };

  const onSelect = async (address: string) => {
    callAsyncAction(async () => {
      dispatch(loadingAdd());
      const results = await geocodeByAddress(address);
      const result = results[0];
      const { place_id, formatted_address, types } = result;
      const latLng = await getLatLng(result);
      dispatch(loadingRemove());
      setAddress(formatted_address);
      dispatch(
        locationSet({
          place_id,
          formatted_address,
          types,
          latLng
        })
      );
    });
  };
  return (
    <>
      <PlacesAutocomplete
        debounce={350}
        value={address}
        onChange={onChange}
        onSelect={onSelect}
        searchOptions={{
          types: ["address"],
          componentRestrictions: { country: "cz" }
        }}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <Input
              {...getInputProps({
                placeholder: "Rooseveltova 42",
                className: "location-search-input"
              })}
            />
            <PlaceSuggestionWrapper>
              {loading && <Loader mt=".5rem" static />}
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
