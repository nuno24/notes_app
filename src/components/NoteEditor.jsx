import supabase from "../utils/supabase";
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { createNote, deleteNote } from "../services/noteService";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

export default function NoteEditor() {
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
        }
      }
      loadNote();
    }

  }, [id]);


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
      navigate('/notes');
    } catch(error) {
      console.error('Error deleting:',error);
  }
  }

  return(
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex flex-row justify-between items-center mb-6">
            <Link to="/notes" className="justify-self-center text-blue-500 hover:text-blue-700 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <h2 className="text-lg font-semibold mb-4 text-center flex-grow">
              {id ? 'Edit Note' : 'New Note'}
            </h2>
            {id && (
              <IconButton
              aria-label="delete"
              style={{ color: "red", marginRight: "8px" }}
              onClick={handleDelete}
            >
              <DeleteIcon />
            </IconButton>
            )}
        </div>

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