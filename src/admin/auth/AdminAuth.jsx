import { Navigate } from 'react-router-dom';

const AdminAuth = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminAuth;