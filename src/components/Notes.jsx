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
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-lg w-250">
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
        <button 
          className="w-full mb-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleNewNote}
          >
          New Note
        </button>
        <ul className="pl-5 list-none">
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
