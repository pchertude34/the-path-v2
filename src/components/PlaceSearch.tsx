import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';
import { useGoogleMaps } from 'hooks/useGoogleMaps';

type PlaceSearchProps = {
  label: string;
  placeholder?: string;
  helpText?: string;
  isDisabled?: boolean;
  placeTypes?: string[];
  onPlaceChange: (place: google.maps.places.PlaceResult) => void;
};

export default function PlaceSearch(props: PlaceSearchProps) {
  const {
    label,
    placeholder,
    helpText,
    isDisabled = false,
    placeTypes = ['address'],
    onPlaceChange,
  } = props;

  const { isLoaded } = useGoogleMaps();
  const addressInputRef = useRef<HTMLInputElement>(null);
  const autocomplete = useRef<google.maps.places.Autocomplete>();

  useEffect(() => {
    // We want to make sure autocomplete isn't initialized already, otherwise
    // google places might render a bunch of dropdowns.
    if (isLoaded && addressInputRef.current && !autocomplete.current) {
      // Initialize the google places autocomplete on the address input.
      autocomplete.current = new google.maps.places.Autocomplete(addressInputRef.current, {
        componentRestrictions: { country: ['us'] },
        fields: ['address_components', 'geometry', 'name', 'place_id'],
        types: placeTypes,
      });

      // Setup a listener on the address input to query for places whenever the user
      // changes the text.
      autocomplete.current.addListener('place_changed', () => {
        // autocomplete.current is guarenteed to be defined here, but typescript doesn't realize
        // that since it's in a callback or something.
        const place = autocomplete.current?.getPlace() as google.maps.places.PlaceResult;
        onPlaceChange(place);
      });
    }
  }, [isLoaded, placeTypes, onPlaceChange]);

  return (
    <div>
      {label && (
        <label htmlFor={`${label}-input`} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="mt-1">
        <input
          id={`${label}-input`}
          ref={addressInputRef}
          name={`${label}-input`}
          disabled={isDisabled}
          type="text"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          placeholder={placeholder}
        />
      </div>
      {helpText && <p className="mt-2 text-sm text-gray-500">{helpText}</p>}
    </div>
  );
}
