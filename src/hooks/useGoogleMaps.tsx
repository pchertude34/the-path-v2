import React, { useState, useEffect, useRef, useContext, createContext } from 'react';

const GoogleMapsContext = createContext<{ isLoaded: boolean }>({
  isLoaded: false,
});

type GoogleMapsProviderProps = {
  children: React.ReactNode;
};

export default function GoogleMapsProvider(props: GoogleMapsProviderProps) {
  const { children } = props;
  const [isLoaded, setIsLoaded] = useState(false);
  const effectCalled = useRef(false);

  useEffect(() => {
    // React 18 causes useEffects to be called twice in development mode. Check to see if this effect has already
    // been called before mounting the google maps script tag to the dom.
    if (!effectCalled.current) {
      const googleMapsScriptTag = document.createElement('script');

      googleMapsScriptTag.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&libraries=places`;
      googleMapsScriptTag.onload = () => {
        setIsLoaded(true);
      };

      document.head.appendChild(googleMapsScriptTag);

      effectCalled.current = true;
    }
  }, []);

  return <GoogleMapsContext.Provider value={{ isLoaded }}>{children}</GoogleMapsContext.Provider>;
}

export function useGoogleMaps() {
  return useContext(GoogleMapsContext);
}
