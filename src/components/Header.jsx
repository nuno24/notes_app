import { useEffect, useState } from 'react';
import supabase from '../utils/supabase';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const [userEmail, setUserEmail] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const {
          data: {user},
        } = await supabase.auth.getUser();
        if (user) {
          setUserEmail(user.email);
          console.log('User:', user);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchUserData();
  }, []);


  const handleLogout = async () => {
    const {error} = await supabase.auth.signOut();
    if(error) {
      console.log('Error logging out:', error.message);
    } else {
      console.log('Logged out');
      navigate('/');
    }
  }

  return (
    <header className="relative bg-gray-800 text-white p-4 flex justify-between items-center">
        <h1 className="text-center">Notes App</h1>

        {userEmail && (
          <div className="relative">
            <button
              className="text-sm font-semibold hover:underline"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              {userEmail}
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 bg-white text-black shadow-lg rounded-lg">
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 text-sm hover:bg-gray-200 w-full text-left rounded-lg"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
    </header>
  )
}