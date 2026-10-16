import * as React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export default function GuardRoute({ children, roles }) {
  const { token, role } = useSelector((state) => state.auth);

  if (!token) return <Navigate to='/login' replace={true} />;
  if (!role) return <Navigate to='/' replace={true} />;
  if (roles && !roles.includes(role)) {
    return <Navigate to='/dashboard' replace={true} />;
  }

  return children || <Outlet />;
}
