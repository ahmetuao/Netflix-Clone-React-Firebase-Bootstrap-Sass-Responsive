import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('')
  const { user, signUp } = UserAuth();
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(email, password);
      return navigate('/profiles')
    } catch (error) {
      if(error.message.includes('Firebase: Password should be at least 6 characters (auth/weak-password).')) {
        setError('Şifre en az 6 karakterden oluşmalıdır')
      }
      if(error.message.includes('Firebase: Error (auth/email-already-in-use).')) {
        setError('Bu mail adresi kullanılmaktadır')
      }
      
      console.log(error);
    }
  };

  return (
      <div className='signup' style={{height: '100vh', display: 'flex', alignItems:'center', justifyContent:'center'}}>
            <div className='signup-form-area'  style={{position: 'relative', zIndex: '9'}}>
            <h1 className='text-light mb-3'>Kayıt Ol</h1>
              {error && <p className='p-3 my-2 text-danger'>{error}</p>}
              <form onSubmit={handleSubmit} className='signup-form d-flex flex-column'>
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
                <button className='my-3 btn btn-lg btn-danger signup-button'>
                  Kayıt Ol
                </button>
     
                <p className='pt-3 m-0'>
                  <span className=''>
                  <span className='text-light'>Zaten üye misiniz?</span>{' '}
                  </span>{' '}
                  <Link className="text-danger font-weight-bold" to='/login'>Giriş yapın.</Link>
                </p>
              </form>
            </div>
            </div>
  );
};

export default Signup;