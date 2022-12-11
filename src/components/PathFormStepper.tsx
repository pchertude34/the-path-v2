import React, { useState, createContext, useContext } from 'react';
import clsx from 'clsx';
import { CheckIcon } from '@heroicons/react/20/solid';

const StepperContext = createContext({});

type PathFormStepperProps = {
  children: React.ReactElement<PathFormStepType>[];
};

export function PathFormStepper(props: PathFormStepperProps) {
  const { children } = props;
  const [activeIndex, setActiveIndex] = useState();

  return (
    <StepperContext.Provider value={{ activeIndex, setActiveIndex }}>
      <nav aria-label="Progress">
        <ol className="overflow-hidden">
          {React.Children.map(children, (child, index) =>
            React.cloneElement(child, { isLastStep: index === React.Children.count(children) - 1 })
          )}
        </ol>
      </nav>
    </StepperContext.Provider>
  );
}

type PathFormStepType = {
  name: string;
  status?: 'complete' | 'incomplete' | 'current';
  isLastStep?: boolean;
};

export function PathFormStep(props: PathFormStepType) {
  const { name, status = 'incomplete', isLastStep = false } = props;

  return (
    <li className={clsx('relative', { 'pb-10': !isLastStep })}>
      {!isLastStep && (
        <div
          className="absolute top-4 left-4 -ml-px mt-0.5 h-full w-0.5 bg-gray-300"
          aria-hidden="true"
        />
      )}
      <a className="group relative flex items-start">
        <span className="flex h-9 items-center" aria-hidden="true">
          <span
            className={clsx(
              'relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2',
              {
                'border-gray-300 bg-white group-hover:border-gray-400': status === 'incomplete',
                'border-primary-600 bg-white': status === 'current',
                'bg-primary-600 group-hover:bg-primary-800': status === 'complete',
              }
            )}
          >
            {status === 'complete' ? (
              <CheckIcon className="h-5 w-5 text-white" aria-hidden="true" />
            ) : (
              <span
                className={clsx('h-2 5 w-2 5 rounded-full', {
                  'bg-transparent group-hover:bg-gray-300': status === 'incomplete',
                  'bg-primary-600': status === 'current',
                })}
              />
            )}
          </span>
        </span>
        <span className="ml-4 min-w-0 self-center">
          <span
            className={clsx('text-sm font-medium', {
              'text-gray-500': status === 'incomplete',
              'text-primary-600': status === 'current',
            })}
          >
            {name}
          </span>
        </span>
      </a>
    </li>
  );
}

PathFormStepper.Step = PathFormStep;

export default PathFormStepper;
