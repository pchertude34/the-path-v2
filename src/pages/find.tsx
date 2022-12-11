import React, { useState } from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { Transition } from '@headlessui/react';
import PathFormStepper from '@components/PathFormStepper';
import LocationIntput from '@components/LocationInput';
import ServiceTypeContainer from '@components/ServiceTypeContainer';
import ProviderList from '@components/ProviderList';

const COMPLETE_STATUS = 'complete';
const INCOMPLETE_STATUS = 'incomplete';
const CURRENT_STATUS = 'current';

export default function FindPage() {
  const [latitude, setLatitude] = useState<number | undefined>();
  const [longitude, setLongitude] = useState<number | undefined>();
  const [distance, setDistance] = useState<number | null>();
  const [selectedServiceType, setSelectedServiceType] = useState<string | null>();
  const [stepStatus, setStepStatus] = useState({
    step1: CURRENT_STATUS,
    step2: INCOMPLETE_STATUS,
    step3: INCOMPLETE_STATUS,
  });

  console.log('latitude', latitude);
  console.log('longitude', longitude);
  console.log('distance', distance);
  console.log('selectedServiceType', selectedServiceType);

  return (
    <div className="space-y-8">
      <PathFormStepper>
        <PathFormStepper.Step name="Step 1" status="complete" />
        <PathFormStepper.Step name="Step 2" status="current" />
        <PathFormStepper.Step name="Step 3" status="incomplete" />
      </PathFormStepper>

      <PathFormItem
        title="Where are you located?"
        description="Enter the address for you, or a person you are trying to help. Or you can use your current location."
        isShowing={true}
      >
        {({ setIsComplete }) => (
          <LocationIntput
            label="Street Address"
            placeholder="1234 S Main St, Portland OR"
            onLocationChange={({ longitude, latitude }) => {
              setLatitude(latitude);
              setLongitude(longitude);
              setIsComplete(true);
            }}
          />
        )}
      </PathFormItem>

      <PathFormItem
        title="What sort of service are you looking for?"
        description="Select a type of the nearby services that you need to access"
        isShowing={!!latitude && !!longitude}
      >
        {({ setIsComplete }) =>
          // Conditionally render the ServiceTypeContainer to get around typescript being mad about lat and lng
          // Technically, the ServiceTypeContainer won't be rendered until lat and lng are truthy in the <PathFormItem />
          // but typescript isn't smart enough to know that so we need to do this conditional render.
          !!latitude &&
          !!longitude && (
            <ServiceTypeContainer
              latitude={latitude}
              longitude={longitude}
              onServiceTypeSelected={(t: string | null) => {
                setSelectedServiceType(t);
                setIsComplete(t === null ? false : true);
              }}
              onDistanceChanged={(d: number) => setDistance(d)}
            />
          )
        }
      </PathFormItem>

      <PathFormItem
        title="Select a service to locate"
        description="Select one of the services we know about to get directions or learn more about it."
        isShowing={!!latitude && !!longitude && !!distance && !!selectedServiceType}
      >
        {({ setIsComplete }) =>
          !!latitude &&
          !!longitude &&
          !!distance &&
          !!selectedServiceType && (
            <ProviderList
              latitude={latitude}
              longitude={longitude}
              distance={distance}
              serviceType={selectedServiceType}
            />
          )
        }
      </PathFormItem>
    </div>
  );
}

type PathFormItemType = {
  title: string;
  description: string;
  isShowing: boolean;
  children: ({
    setIsComplete,
  }: {
    setIsComplete: React.Dispatch<React.SetStateAction<boolean>>;
  }) => JSX.Element | false | null;
};

function PathFormItem(props: PathFormItemType) {
  const { title, description, isShowing, children } = props;
  const [isComplete, setIsComplete] = useState(false);

  return (
    <Transition
      appear={true}
      show={isShowing}
      enter="transition-opacity duration-250"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="bg-white shadow sm:rounded-lg px-4 py-5 sm:p-6">
        <div className="grid grid-cols-5">
          <div className="col-span-4">
            <h2 className="text-gray-700 font-bold text-2xl">{title}</h2>
            <p className="text-gray-700 text-md mb-6">{description}</p>
          </div>
          <div className="col-span-1 flex">
            <div className="ml-auto">
              <Transition
                show={isComplete}
                enter="transform transition duration-250"
                enterFrom="opacity-0 scale-50"
                enterTo="opacity-100 scale-100"
                leave="transition-opacity duration-75"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <CheckCircleIcon
                  className="block h-10 w-10 text-green-600"
                  aria-label="step complete"
                />
              </Transition>
            </div>
          </div>
        </div>
        {children({ setIsComplete })}
      </div>
    </Transition>
  );
}
