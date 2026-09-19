import { Navigate, Route, Routes, Outlet } from 'react-router-dom';
import GuardRoute from '../components/GuardRoute';
import GuestOnlyRoute from '../components/GuestOnlyRoute';

import Login from '../pages/signin';
import SignUp from '../pages/signup';
import Activate from '../pages/activate';
import Home from '../pages/home';
import { HomeRoute } from './HomeRoute';
import { TalentsRoute } from './TalentsRoute';
import { CategoriesRoute } from './CategoriesRoute';
import { PaymentsRoute } from './PaymentsRoute';
import SNavbar from '../components/Navbar';
import Details from '../pages/details';
import { EventsRoute } from './EventsRoute';
import { OrdersRoute } from './OrdersRoute';

export function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path='/' element={<Home />} />
      <Route path='/details' element={<Details />} />
      <Route index element={<Home />} />
      <Route
        path='/login'
        element={
          <GuestOnlyRoute>
            <Login />
          </GuestOnlyRoute>
        }
      />
      <Route
        path='/signup'
        element={
          <GuestOnlyRoute>
            <SignUp />
          </GuestOnlyRoute>
        }
      />
      <Route
        path='/activate'
        element={
          <GuestOnlyRoute>
            <Activate />
          </GuestOnlyRoute>
        }
      />

      {/* Protected Dashboard Routes */}
      <Route
        path='/dashboard'
        element={
          <>
            <SNavbar />
            <GuardRoute>
              <Outlet />
            </GuardRoute>
          </>
        }
      >
        <Route path='' element={<HomeRoute />} />
      </Route>

      {/* Protected Categories Routes */}
      <Route
        path='/categories'
        element={
          <>
            <SNavbar />
            <GuardRoute>
              <Outlet />
            </GuardRoute>
          </>
        }
      >
        <Route path='' element={<CategoriesRoute />} />
      </Route>

      {/* Protected Talents Routes */}
      <Route
        path='/talents'
        element={
          <>
            <SNavbar />
            <GuardRoute>
              <Outlet />
            </GuardRoute>
          </>
        }
      >
        <Route path='' element={<TalentsRoute />} />
      </Route>

      {/* Protected Payments Routes */}
      <Route
        path='/payments'
        element={
          <>
            <SNavbar />
            <GuardRoute>
              <Outlet />
            </GuardRoute>
          </>
        }
      >
        <Route path='' element={<PaymentsRoute />} />
      </Route>

      {/* Protected Events Routes */}
      <Route
        path='/events'
        element={
          <>
            <SNavbar />
            <GuardRoute>
              <Outlet />
            </GuardRoute>
          </>
        }
      >
        <Route path='' element={<EventsRoute />} />
      </Route>

      {/* Protected Orders Routes */}
      <Route
        path='/orders'
        element={
          <>
            <SNavbar />
            <GuardRoute>
              <Outlet />
            </GuardRoute>
          </>
        }
      >
        <Route path='' element={<OrdersRoute />} />
      </Route>

      {/* Fallback to home */}
      <Route path='*' element={<Navigate to='/' replace={true} />} />
    </Routes>
  );
}