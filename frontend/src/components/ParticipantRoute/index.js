import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

export default function ParticipantRoute({ children }) {
  const { token, role } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (role) return <Navigate to="/dashboard" replace />;
  return children;
}
