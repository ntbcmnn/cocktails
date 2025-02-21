import './App.css'
import Toolbar from './components/UI/Toolbar/Toolbar.tsx';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './containers/LoginPage/LoginPage.tsx';
import RegisterPage from './containers/RegisterPage/RegisterPage.tsx';
import Home from './containers/Home/Home.tsx';
import { selectUser } from './store/slices/usersSlice.ts';
import AddCocktail from './containers/AddCocktail/AddCocktail.tsx';
import DetailedCocktail from './containers/DetailedCocktail/DetailedCocktail.tsx';
import MyCocktails from './containers/MyCocktails/MyCocktails.tsx';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.tsx';
import { useAppSelector } from './app/hooks.ts';

const App = () => {
  const user = useAppSelector(selectUser);
  return (
    <>
      <Toolbar/>
      <div className="my-5">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/cocktails" element={<MyCocktails/>}/>
          <Route path="/cocktails/:cocktailId" element={<DetailedCocktail/>}/>
          <Route
            path="/cocktails/new"
            element={
              <ProtectedRoute
                isAllowed={user && (user.role === 'admin' || user.role === 'user')}
              >
                <AddCocktail/>
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="*" element={<h1 className="text-center mt-5">Page not found</h1>}/>
        </Routes>
      </div>
    </>
  )
};

export default App
