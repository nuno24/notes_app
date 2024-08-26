import { useState } from 'react';
import supabase from '../utils/supabase';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault()
    setError(null)

    const {error} = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if (error) {
      setError(error.message)
    } else {
      console.log('logged in')
    }
  }


  return (
    <div>
      <div className='bg-slate-500'>
        <form onSubmit={handleLogin} className='flex flex-col items-center justify-center h-screen'>
          <h1 className='text-center bg-gray-800 text-white p-4 rounded'>Login</h1>
          <label htmlFor='email' className='text-white'>Email</label>
          <input 
            type='email' 
            placeholder='Email' 
            id='email'
            name="email"
            required
            value={email}
            className='border border-gray-800 p-2 m-2 rounded'
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor='password' className='text-white'>Password</label>
          <input 
            type='password' 
            placeholder='Password' 
            name='password'
            required
            value={password}
            className='border border-gray-800 p-2 m-2 rounded' 
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className='text-red-500'>{error}</p>}
          <button type='submit'className='border border-gray-800 p-2 m-2 rounded'>Login</button>
        </form>
      </div>
    </div>
  );
};
