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
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
    <div className="bg-white p-6 rounded shadow-lg w-250">
      <div className="flex flex-row justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-center mb-4">{userEmail}s Notes</h1>
        <h2>
          {id ? 'Edit Note' : 'New Note'}
        </h2>
        <button 
          className="ml-4"
          onClick={handleLogout}
        >
          X
        </button>
        <button>
          <Link to="/notes">Back</Link>
        </button>
        {id && (
            <button
            onClick={handleDelete}
            className="ml-4"
          >
            Delete
          </button>
        )}

      </div>

      <form onSubmit={handleSubmit}>
        <button className="w-full mb-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          SAVE
        </button>
        <input 
          id="title"
          name="title"
          type="text" 
          value={note.title}
          onChange={handleChange}
          placeholder="Title" 
          className="w-full p-2 mb-4 rounded border"
        />
        <textarea 
          id="content"
          name="content"
          value={note.content}
          onChange={handleChange}
          placeholder="Content" 
          className="w-full p-2 mb-4 rounded border"
        />
      </form>
    </div>
  </div>
  )
}