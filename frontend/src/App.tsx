import './App.css'
import Toolbar from './components/UI/Toolbar/Toolbar.tsx';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './containers/LoginPage/LoginPage.tsx';
import RegisterPage from './containers/RegisterPage/RegisterPage.tsx';

const App = () => {
  return (
    <>
      <Toolbar/>
      <div className="my-5">
        <Routes>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="*" element={<h1 className="text-center mt-5">Page not found</h1>}/>
        </Routes>
      </div>
    </>
  )
};

export default App
