import * as React from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Component to scroll top after navigation to the new page.
 */
export const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};
