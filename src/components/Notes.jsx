import { useEffect, useState } from "react";
import supabase from "../utils/supabase";
import { useNavigate } from 'react-router-dom';
import NoteComponent from "./NoteComponent";
import { deleteNote, fetchNotes } from "../services/noteService";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [userEmail, setUserEmail] = useState(null);

  const navigate = useNavigate();

  const handleNewNote = () => {
    navigate('/new');
  }

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

    const loadNotes = async () => {
      try {
        const notesData = await fetchNotes();
        setNotes(notesData);
      } catch (error) {
      console.error(error);
    }
    }

    loadNotes();
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

  const handleDelete = async (id) => {
    try{
      await deleteNote(id);
      setNotes(notes.filter((note) => note.id !== id));
      console.log('Note deleted');
    } catch(error) {
      console.error(error);
    }
  }


  return (
<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
  <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
    <div className="flex flex-row justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">Welcome, {userEmail}</h1>
      <button 
        className="ml-4 text-gray-600 hover:text-gray-900 transition-colors"
        onClick={handleLogout}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    <h2 className="text-xl font-semibold text-center mb-6">Your Notes</h2>
    <button 
      className="w-full mb-6 p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold"
      onClick={handleNewNote}
    >
      New Note
    </button>
    <ul className="list-none space-y-4">
      {notes.map((note) => (
        <li key={note.id} className="mb-2">
          <NoteComponent 
            id={note.id}
            title={note.title} 
            content={note.content} 
            date={note.date} 
            handleDelete={handleDelete}
          />
        </li>
      ))}
    </ul>
  </div>
</div>

  );
}
