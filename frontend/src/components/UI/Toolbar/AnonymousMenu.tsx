import { NavLink } from 'react-router-dom';

const AnonymousMenu = () => {
  return (
    <>
      <NavLink to="/login" className="btn btn-outline-light me-2">
        Sign in
      </NavLink>
      <NavLink to="/register" className="btn btn-outline-light">
        Sign up
      </NavLink>
    </>
  );
};

export default AnonymousMenu;