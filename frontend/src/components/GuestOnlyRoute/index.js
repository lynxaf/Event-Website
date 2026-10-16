import * as React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export default function GuestOnlyRoute({ children }) {
  const { token, role } = useSelector((state) => state.auth);

  // Participant sessions do not have a CMS role and must still be able to
  // open the CMS sign-in page.
  if (token && role) return <Navigate to='/dashboard' replace={true} />;

  return children || <Outlet />;
}
