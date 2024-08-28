import { useEffect, useState } from "react";
import supabase from "../utils/supabase";
import { useNavigate } from 'react-router-dom';

export default function Notes() {
  const notes = ["Note 1", "Note 2", "Note 3"]; // Example notes
  const [userEmail, setUserEmail] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const {
          data: {user},
        } = await supabase.auth.getUser();
        if (user) {
          setUserEmail(user.email);
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
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <div className="flex flex-row justify-between items-center mb-4">
          <h1 className="text-xl font-bold text-center mb-4">Welcome, {userEmail}</h1>
          <button 
            className="ml-4"
            onClick={handleLogout}
          >
            X
          </button>
        </div>
        <h1 className="text-xl font-bold text-center mb-4">Your Notes</h1>
        <button className="w-full mb-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          New Note
        </button>
        <ul className="list-disc pl-5">
          {notes.map((note, index) => (
            <li key={index} className="mb-2">
              {note}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
