import supabase from "../utils/supabase";
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { createNote, deleteNote } from "../services/noteService";

export default function NoteEditor() {
  const [userEmail, setUserEmail] = useState(null);
  const [note, setNote] = useState({title: '', content: ''});
  const {id} = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if(id) {
      const loadNote = async () => {
        const {data, error} = await supabase
        .from('notes')
        .select()
        .eq('id', id)
        .single()
        if(error) {
          console.error('Error loading note:', error.message);
        } else {  
          setNote({
            title: data.title,
            content: data.content
          });
          console.log('Note:', data);
        }
      }
      loadNote();
    }
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
  }, [id]);

  const handleLogout = async () => {
    const {error} = await supabase.auth.signOut();
    if(error) {
      console.log('Error logging out:', error.message);
    } else {
      console.log('Logged out');
      navigate('/');
    }
  }

  const handleChange = (e) => {
    setNote({
      ...note,
      [e.target.name]: e.target.value
    });
    }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      if(id) {
        const {error} = await supabase
        .from('notes')
        .update(note)
        .eq('id', id)
        if(error) throw new Error(error.message);
      } else {
        await createNote({
          title: note.title,
          content: note.content
        });
        navigate('/notes');
      }
    }catch(error) {
      console.error('Error updating note:', error.message);
    }
  }

  const handleDelete = async () => {
    try{
      await deleteNote(id);
      console.log('Note deleted');
      navigate('/notes');
    } catch(error) {
      console.error('Error deleting:',error);
  }
  }

  return(
<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
  <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
    <div className="flex flex-row justify-between items-center mb-6">
      <div className="flex space-x-4">
        <button 
          className="text-gray-600 hover:text-gray-900 transition-colors"
          onClick={handleLogout}
          title="Logout"
        >
          Logout
        </button>
        <Link to="/notes" className="text-blue-500 hover:text-blue-700 transition-colors">
          Back
        </Link>
        {id && (
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700 transition-colors"
            title="Delete Note"
          >
            Delete
          </button>
        )}
      </div>
    </div>

    <h2 className="text-lg font-semibold mb-4">
      {id ? 'Edit Note' : 'New Note'}
    </h2>

    <form onSubmit={handleSubmit}>
      <input 
        id="title"
        name="title"
        type="text" 
        value={note.title}
        onChange={handleChange}
        placeholder="Title" 
        className="w-full p-3 mb-4 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <textarea 
        id="content"
        name="content"
        value={note.content}
        onChange={handleChange}
        placeholder="Content" 
        className="w-full p-3 mb-4 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button 
        type="submit"
        className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors font-semibold"
      >
        SAVE
      </button>
    </form>
  </div>
</div>

  )
}