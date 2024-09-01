import { useState } from 'react';
import supabase from '../utils/supabase';
import { useNavigate } from 'react-router-dom';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);

  const navigate = useNavigate();

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
      navigate('/notes')
      //redirect to notes page 
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault()
    setError(null)
    
    const {error} = await supabase.auth.signUp({
      email,
      password
    })
    if (error) {
      setError(error.message)
    } else {
      console.log('registered')
      setIsRegistering(false)
      navigate('/') 
    }
  }


  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='bg-white p-10 rounded-lg shadow-lg w-full max-w-sm'>
        <form onSubmit={isRegistering ? handleRegister : handleLogin} className='flex flex-col items-center justify-center space-y-4'>
          <h1 className='text-center text-2xl font-bold bg-gray-800 text-white p-4 rounded mb-4'>
            {isRegistering ? 'Register' : 'Login'}
          </h1>
          <label htmlFor='email' className='text-black font-bold'>Email</label>
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
          <label htmlFor='password' className='text-black font-bold'>Password</label>
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
          <button type='submit'className='border border-gray-800 p-2 rounded bg-blue-500 text-white hover:bg-blue-600'>Login</button> 
          <p></p>
        </form>

        <p className="text-center mt-4">
          {isRegistering ? (
            <>
              Already have an account?{' '}
              <span
                onClick={() => setIsRegistering(false)}
                className="text-blue-400 cursor-pointer underline"
              >
                Login here
              </span>
            </>
          ) : (
            <>
              Dont have an account?{' '}
              <span
                onClick={() => setIsRegistering(true)}
                className="text-blue-400 cursor-pointer underline"
              >
                Register here
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};
