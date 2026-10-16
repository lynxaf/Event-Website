import { Route, Routes } from 'react-router-dom';
import Users from '../pages/users';

export function UsersRoute() {
  return (
    <Routes>
      <Route path='/' element={<Users />} />
    </Routes>
  );
}
