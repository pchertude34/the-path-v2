import React, { useState, useRef, useEffect } from 'react';
import { trpc } from '@utils/trpc';
import clsx from 'clsx';
import { MapIcon, ListBulletIcon } from '@heroicons/react/24/outline';

const PROVIDER_PAGE_SIZE = 5;

type ProviderListProps = {
  distance: number;
  latitude: number;
  longitude: number;
  serviceType: string;
};

export default function ProviderList(props: ProviderListProps) {
  const { distance, latitude, longitude, serviceType } = props;

  const [map, setMap] = useState<google.maps.Map | undefined>();
  const [showMap, setShowMap] = useState(true);
  const mapRef = useRef<HTMLDivElement>(null);

  console.log('mapRef.current', mapRef.current);

  const { data: providerData } = trpc.useQuery([
    'providers.list',
    { lat: latitude, lng: longitude, distance, serviceType },
  ]);

  // Initialize the google map. Change it when the user location changes so we can recenter it.
  useEffect(() => {
    if (mapRef.current && latitude && longitude) {
      setMap(
        new window.google.maps.Map(mapRef.current, {
          center: { lat: latitude, lng: longitude },
          mapTypeControl: false,
          zoom: 10,
        })
      );
    }
  }, [mapRef, latitude, longitude]);

  // Add the user's selected location to the google map
  useEffect(() => {
    let currentLocationMarker: google.maps.Marker;

    if (map && latitude && longitude) {
      currentLocationMarker = new google.maps.Marker({
        position: new google.maps.LatLng(latitude, longitude),
        icon: '/my_location.svg',
      });
      currentLocationMarker.setMap(map);
    }

    return () => {
      if (currentLocationMarker) {
        currentLocationMarker.setMap(null);
      }
    };
  }, [map, latitude, longitude]);

  return (
    <React.Fragment>
      <button className="btn btn-primary-outline md:hidden" onClick={() => setShowMap(!showMap)}>
        {showMap ? (
          <>
            <ListBulletIcon className="h-4 w-4 mr-1" /> View List
          </>
        ) : (
          <>
            <MapIcon className="h-4 w-4 mr-1" /> View Map
          </>
        )}
      </button>
      <div className="flex h-full w-full">
        <div>Hello world</div>
        <div className={clsx('md:block w-full', `${showMap ? 'block' : 'hidden'}`)}>
          <div ref={mapRef} style={{ height: '500px' }}></div>
        </div>
      </div>
    </React.Fragment>
  );
}

type ProviderListItemProps = {
  placeId: string;
  isActive?: boolean;
  distance: number;
  map: google.maps.Map;
  onClicK: () => void;
};

function ProviderListItem(props: ProviderListItemProps) {
  return <div>list item</div>;
}
