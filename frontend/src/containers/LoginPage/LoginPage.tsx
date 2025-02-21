import React, { useState } from 'react';
import { LoginMutation } from '../../types';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectLoginError, selectLoginLoading } from '../../store/slices/usersSlice.ts';
import { NavLink, useNavigate } from 'react-router-dom';
import { googleLogin, login } from '../../store/thunks/usersThunk.ts';
import { GoogleLogin } from '@react-oauth/google';
import Loader from '../../components/UI/Loader/Loader.tsx';

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const loginError = useAppSelector(selectLoginError);
  const isLoading = useAppSelector(selectLoginLoading);
  const navigate = useNavigate();
  const [form, setForm] = useState<LoginMutation>({
    email: '',
    password: '',
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setForm(prevState => ({...prevState, [name]: value}));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(login(form)).unwrap();
    navigate('/');
  };

  const googleLoginHandler = async (credential: string) => {
    await dispatch(googleLogin(credential)).unwrap();
    navigate('/');
  };

  return (
    <div className="container mt-5" style={{maxWidth: '400px'}}>
      <div className="text-center mb-4">
        <i className="bi bi-unlock fs-2" style={{color: '#4389cc'}}></i>
        <h2 className="mt-2" style={{color: '#4389cc'}}>Sign In</h2>
      </div>

      <div className="mb-3 d-flex flex-column align-items-center">
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            if (credentialResponse.credential) {
              void googleLoginHandler(credentialResponse.credential);
            }
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        >
        </GoogleLogin>
      </div>

      {loginError && (
        <div className="alert alert-danger" role="alert">
          {loginError.error}
        </div>
      )}

      {isLoading ? <Loader/> :
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              value={form.email}
              onChange={onChange}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={onChange}
              className="form-control"
            />
          </div>

          <button type="submit" className="btn btn-blue w-100">
            Sign In
          </button>

          <div className="text-center mt-3">
            <NavLink to="/register" className="text-decoration-none">Don't have an account yet? Sign up</NavLink>
          </div>
        </form>
      }
    </div>
  );
};

export default LoginPage;