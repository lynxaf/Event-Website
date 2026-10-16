import { useEffect } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';

import { listen } from './redux/listener';
import { AppRoutes } from './routes';

function App() {
  useEffect(() => {
    listen();
  }, []);

  return (
    <BrowserRouter>
      <PageTitle />
      <AppRoutes />
    </BrowserRouter>
  );
}

function PageTitle() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith('/details/')) {
      document.title = 'Semina | Event Details';
    } else if (location.pathname.startsWith('/checkout/')) {
      document.title = 'Semina | Checkout';
    } else if (location.pathname.startsWith('/participant/')) {
      document.title = 'Semina | My Orders';
    } else if (location.pathname === '/login') {
      document.title = 'Semina | Sign In';
    } else if (location.pathname === '/signup') {
      document.title = 'Semina | Sign Up';
    } else {
      document.title = 'Semina | Events';
    }
  }, [location.pathname]);

  return null;
}

export default App;