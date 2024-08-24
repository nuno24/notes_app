import { useState, useEffect } from 'react';
import { fetchNotes } from '../services/noteService';



const NoteList = ({ onSelectNote }) => {

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const fetchedNotes = await fetchNotes();
        setNotes(fetchedNotes);
        console.log('Notes fetched', fetchedNotes);
      } catch (error) {
        console.error('Notes fetch error', error);
      }
    };
    loadNotes();
  }, []);



  return (
    <div className="h-full">
      <h1 className="font-bold text-center text-2xl p-3">Notes List</h1>
      <ul>
        {notes.map(note => (
          <li 
            className="border-2 rounded m-1 border-gray-500 hover:bg-gray-400 hover:border-gray-800 active:bg-gray-300 p-2 cursor-pointer" 
            key={note.date}
            onClick={() => onSelectNote(note)}
            >
            <div className="flex justify-between items-start">
              <h1 className="text-lg font-bold">{note.title}</h1>
              <h2 className="text-right text-xs">{note.date}</h2>
            </div>
            <p className="text-xs">{note.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NoteList;
