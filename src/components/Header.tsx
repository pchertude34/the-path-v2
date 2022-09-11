import { Fragment } from 'react';
import NextLink from 'next/link';
import { Popover, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function Header() {
  return (
    <Popover className="relative bg-white">
      <div className="pointer-events-none absolute inset-0 z-30 shadow" aria-hidden="true" />
      <div className="relative z-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 sm:py-4 md:justify-start md:space-x-10 lg:px-8">
          <div>
            <span className="text-base text-gray-700 font-bold">The Path</span>
          </div>
          <div className="-my-2 -mr-2 md:hidden">
            <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500">
              <span className="sr-only">Open menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <div className="hidden md:flex md:flex-1 md:items-center md:justify-between">
            <Popover.Group as="nav" className="flex space-x-10">
              <NextLink href="/about">
                <a className="text-base font-medium text-gray-500 hover:text-gray-900">About</a>
              </NextLink>
              <NextLink href="/contact">
                <a className="text-base font-medium text-gray-500 hover:text-gray-900">Contact</a>
              </NextLink>
            </Popover.Group>
            <div className="flex items-center md:ml-12">
              <NextLink href="/find">
                <a className="items-center justify-center inline-flex rounded-md border border-transparent bg-primary-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-primary-700">
                  Find Your Path
                </a>
              </NextLink>
            </div>
          </div>
        </div>
      </div>
      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute inset-x-0 top-0 z-30 origin-top-right transform p-2 transition md:hidden"
        >
          <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="px-5 pt-5 pb-6 sm:pb-8">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-base text-gray-700">The Path</span>
                </div>
                <div className="-mr-2">
                  <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover-text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500">
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
            </div>
            <div className="py-6 px-5">
              <div className="grid grid-cols-2 gap-4">
                <NextLink href="/about">
                  <a className="rounded-md text-base font-medium text-gray-900 hover:text-gray-700">
                    About
                  </a>
                </NextLink>
                <NextLink href="/contact">
                  <a
                    href="#"
                    className="rounded-md text-base font-medium text-gray-900 hover:text-gray-700"
                  >
                    Contact
                  </a>
                </NextLink>
              </div>
              <div className="mt-6">
                <a
                  href="#"
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-primary-700"
                >
                  Find Your Path
                </a>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
