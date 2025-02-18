import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks.ts';
import { selectUser } from '../../../store/slices/usersSlice.ts';
import UserMenu from './UserMenu.tsx';
import AnonymousMenu from './AnonymousMenu.tsx';

const Toolbar = () => {
  const user = useAppSelector(selectUser);

  return (
    <nav className="navbar navbar-expand-lg bg-dark">
      <div className="container d-flex align-items-center justify-content-between">
        <NavLink className="navbar-brand text-white d-inline-flex align-items-center gap-2" to="/">
          Cocktails
        </NavLink>
        <div className="d-flex justify-content-end gap-3">
          {user ? <UserMenu user={user}/> : <AnonymousMenu/>}
        </div>
      </div>
    </nav>
  );
};

export default Toolbar;