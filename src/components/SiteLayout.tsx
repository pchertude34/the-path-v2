import React from 'react';
import Navbar from './Navbar';

type SiteLayoutProps = {
  children: React.ReactNode;
};
export default function SiteLayout(props: SiteLayoutProps) {
  const { children } = props;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="py-10">
        <main className="">
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
