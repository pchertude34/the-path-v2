import React, { useEffect, useState } from 'react';
import { MapPinIcon } from '@heroicons/react/24/solid';
import Button from './Button';
import PlaceSearch from './PlaceSearch';

type LocationInputProps = {
  label: string;
  placeholder?: string;
  onLocationChange: ({ longitude, latitude }: { longitude: number; latitude: number }) => null;
};

export default function LocationIntput(props: LocationInputProps) {
  const { label, placeholder, onLocationChange } = props;
  const [latitude, setLatitude] = useState<number | null>();
  const [longitude, setLongitude] = useState<number | null>();
  const [isCalculatingLocation, setIsCalculatingLocation] = useState(false);

  // Call the onLocationChange prop function in this use effect when the location changes
  // since location can change in two places. (either from the places input, or the "use my current location" button)
  useEffect(() => {
    if (latitude && longitude) {
      onLocationChange({ longitude, latitude });
    }
  }, [latitude, longitude, onLocationChange]);

  function handlePlaceChange(place: google.maps.places.PlaceResult) {
    setLatitude(place.geometry?.location.lat());
    setLongitude(place.geometry?.location.lng());
  }

  /**
   * Use native browser functionality to calculate the user's current coordinates.
   * This will require the user to enable location services.
   */
  function calculateLocation() {
    setIsCalculatingLocation(true);
    navigator.geolocation.getCurrentPosition((position) => {
      const { coords } = position;

      setLatitude(coords.latitude);
      setLongitude(coords.longitude);
      setIsCalculatingLocation(false);
    });
  }

  return (
    <React.Fragment>
      <PlaceSearch label={label} placeholder={placeholder} onPlaceChange={handlePlaceChange} />
      <div className="flex">
        <Button
          color="primary"
          className="mt-4"
          onClick={calculateLocation}
          isLoading={isCalculatingLocation}
          leftIcon={<MapPinIcon className="h-4 w-4 mr-1" />}
        >
          Use my current location
        </Button>
      </div>
    </React.Fragment>
  );
}
