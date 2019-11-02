import React, { useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

import { PlaceSuggestionWrapper, PlaceSuggestionItem } from "./styled/Place";
import { Input } from "./styled/Input";

export const Place: React.FC = () => {
  const [address, setAddress] = useState("");
  const handleChange = (address: string) => {
    setAddress(address);
  };

  const handleSelect = (address: string) => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log("Success", latLng))
      .catch(error => console.error("Error", error));
  };
  return (
    <PlacesAutocomplete
      value={address}
      onChange={handleChange}
      onSelect={handleSelect}
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
            {loading && <div>Loading...</div>}
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
  );
};
