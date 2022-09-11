import React, { useState, useEffect, ReactElement, Children } from 'react';
import { useRouter } from 'next/router';
import Link, { LinkProps } from 'next/link';

type ActiveLinkProps = LinkProps & {
  children: ReactElement;
  activeClassName: string;
  inactiveClassName?: string;
  href: string;
};

function ActiveLink(props: ActiveLinkProps) {
  const { children, activeClassName, inactiveClassName = '', href, ...rest } = props;

  const [isActive, setIsActive] = useState(false);
  const { asPath, isReady } = useRouter();

  // Get the class of the child element so we can add inactive or active classes to it later.
  const child = Children.only(children);
  const childClassName = child.props.className || '';

  useEffect(() => {
    // Check if the router fields are updated client-side
    if (isReady) {
      // Dynamic route will be matched via props.as
      // Static route will be matched via props.href
      const linkPathname = new URL(href as string, location.href).pathname;

      // Using URL().pathname to get rid of query and hash
      const activePathname = new URL(asPath, location.href).pathname;

      if (linkPathname === activePathname) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    }
  }, [asPath, isReady, href, childClassName, activeClassName, inactiveClassName]);

  return (
    <Link href={href}>
      {React.cloneElement(child, {
        className: isActive
          ? `${childClassName} ${activeClassName}`
          : `${childClassName} ${inactiveClassName}`,
        'aria-current': isActive ? 'page' : undefined,
        ...rest,
      })}
    </Link>
  );
}

export default ActiveLink;
