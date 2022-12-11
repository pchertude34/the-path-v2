import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { convertMilesToMeters } from '@utils/lib';
import { trpc } from '@utils/trpc';

type ServiceTypeContainerProps = {
  latitude: number;
  longitude: number;
  onServiceTypeSelected: (t: string | null) => void;
  onDistanceChanged: (d: number) => void;
};

type DistanceOption = {
  label: string;
  value: number;
};

const DISTANCE_OPTIONS: readonly [DistanceOption, DistanceOption, DistanceOption] = [
  { label: '5 miles', value: convertMilesToMeters(5) },
  { label: '10 miles', value: convertMilesToMeters(10) },
  { label: '20 miles', value: convertMilesToMeters(20) },
];

export default function ServiceTypeContainer(props: ServiceTypeContainerProps) {
  const { latitude, longitude, onServiceTypeSelected, onDistanceChanged } = props;
  const [distance, setDistance] = useState(DISTANCE_OPTIONS[1].value);
  const [selectedServiceType, setSelectedServiceType] = useState<string | null>(null);

  const { data: serviceTypes } = trpc.useQuery(
    ['servivceTypes.list', { lat: latitude, lng: longitude, distance }],
    { refetchOnWindowFocus: false, keepPreviousData: true }
  );

  // Set the distance of the parent to the defaulted distance
  useEffect(
    () => {
      onDistanceChanged(distance);
    },
    // eslint-disable-next-line
    []
  );

  // Make sure the selected service type exists in the list of service types.
  // selectedServiceType can get out of sync if the user switches the distance after selecting a service type.
  useEffect(
    () => {
      if (selectedServiceType && !serviceTypes?.find((st) => st.id === selectedServiceType)) {
        setSelectedServiceType(null);
        onServiceTypeSelected(null);
      }
    },
    // Since the only time this bug can occur when the serviceTypes list changes, we only need to worry about
    // having that as a dependency. We don't want to waste resoures running this anytime the selectedServiceType
    // changes as well.
    // eslint-disable-next-line
    [serviceTypes]
  );

  function handleSelectServiceType(t: string) {
    setSelectedServiceType(t);
    onServiceTypeSelected(t);
  }

  function handleDistanceChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setDistance(Number(e.target.value));
    onDistanceChanged(Number(e.target.value));
  }

  return (
    <div>
      <div className="ml-4">
        <label htmlFor="distance" className="block text-sm font-medium text-gray-700">
          Search Distance
        </label>
        <select
          id="distance"
          name="distance"
          onChange={handleDistanceChange}
          className="mt-1 rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
          defaultValue={DISTANCE_OPTIONS[0].value}
        >
          {DISTANCE_OPTIONS.map((option) => (
            <option key={`distance-option-${option.value}`} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid  sm:grid-cols-1 md:grid-cols-2 gap-2 max-h-600 overflow-auto p-4">
        {serviceTypes?.map((serviceType) => (
          <ServiceTypeCard
            key={`service-card-${serviceType.id}`}
            title={serviceType.description}
            count={Number(serviceType.total)}
            isSelected={selectedServiceType === serviceType.id}
            onClick={() => handleSelectServiceType(serviceType.id)}
          />
        ))}
      </div>
    </div>
  );
}

type ServiceTypeCardProps = {
  title: string;
  count: number;
  isSelected?: boolean;
  onClick: () => void;
};

function ServiceTypeCard(props: ServiceTypeCardProps) {
  const { title, count, isSelected = false, onClick } = props;

  return (
    <button
      className={clsx(
        'w-full h-full p-6 border rounded border-color-gray-200 hover:bg-primary-100 hover:-translate-y-1 transition ease-in-out duration-150 focus:ring-primary-500 focus:outline-none focus:ring-2 focus:ring-offset-gray-100',
        {
          'bg-primary-100': isSelected,
        }
      )}
      onClick={onClick}
    >
      <span className="block">{title}</span>
      <span className="bg-secondary-500 rounded-full px-2 text-xs text-white font-semibold">
        {count}
      </span>
    </button>
  );
}
