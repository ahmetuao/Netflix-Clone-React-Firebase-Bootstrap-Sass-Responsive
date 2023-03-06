import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('')
  const { user, logIn } = UserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')
    try {
      await logIn(email, password)
        return navigate('/profiles')
    } catch (error) {
      console.log(error);
      setError(error.message)
    }
  };

  return (
      
      <div className='login' style={{height: '100vh', display: 'flex', alignItems:'center', justifyContent:'center'}}>
            <div className='login-form-area'  style={{position: 'relative', zIndex: '9'}}>
            <h1 className='text-light mb-3'>Giriş</h1>
              {error ? <p className='p-3 my-2 text-danger'>Kullanıcı adı veya şifrenizi yanlış girdiniz</p> : null}
              <form onSubmit={handleSubmit} className='login-form d-flex flex-column'>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  className='p-3 my-2 form-control form-control-lg'
                  type='email'
                  placeholder='E-Posta'
                  autoComplete='email'
                />
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  className='p-3 my-2 form-control form-control-lg'
                  type='password'
                  placeholder='Şifre'
                  autoComplete='current-password'
                />
                <button className='my-3 btn btn-lg btn-danger login-button'>
                  Giriş Yap
                </button>
      
                <p className='pt-3 m-0'>
                  <span className='text-light d-block'>Ahmetflix'e katılmak ister misiniz?</span>{' '}
                  <Link className="text-danger font-weight-bold" to='/signup'>Şimdi kaydolun.</Link>
                </p>
              </form>
            </div>
    
            </div>
  );
};

export default Login;