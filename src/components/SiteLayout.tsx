import React from 'react';
import Navbar from './Navbar';

type SiteLayoutProps = {
  children: React.ReactNode;
};
export default function SiteLayout(props: SiteLayoutProps) {
  const { children } = props;

  return (
    <div className="min-h-full">
      <Navbar />
      <div className="py-10">
        <main>
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
