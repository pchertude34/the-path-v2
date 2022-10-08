import React, { useState } from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { Transition } from '@headlessui/react';
import PathFormStepper from '@components/PathFormStepper';
import LocationIntput from '@components/LocationInput';

export default function FindPage() {
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
      >
        {({ setIsShowing, setIsComplete }) => (
          <LocationIntput
            label="Street Address"
            placeholder="1234 S Main St, Portland OR"
            onLocationChange={({ longitude, latitude }) => {
              setIsComplete(true);
            }}
          />
        )}
      </PathFormItem>
      <PathFormItem
        title="What sort of service are you looking for?"
        description="Select a type of the nearby services that you need to access"
      >
        {({ setIsShowing, setIsComplete }) => <div> Hello</div>}
      </PathFormItem>
    </div>
  );
}

type PathFormItemType = {
  title: string;
  description: string;
  children: ({
    setIsShowing,
    setIsComplete,
  }: {
    setIsShowing: React.Dispatch<React.SetStateAction<boolean>>;
    setIsComplete: React.Dispatch<React.SetStateAction<boolean>>;
  }) => JSX.Element;
};

function PathFormItem(props: PathFormItemType) {
  const { title, description, children } = props;
  const [isShowing, setIsShowing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  return (
    <Transition
      appear={true}
      show={true}
      enter="transition-opacity duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
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
          {children({ setIsShowing, setIsComplete })}
        </div>
      </div>
    </Transition>
  );
}
