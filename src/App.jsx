import { useState } from 'react';
import './App.css';
import NoteList from './components/NoteList';
import NoteEditor from './components/NoteEditor';



function NotesPage({ notes }) {
  const [selectedNote, setSelectedNote] = useState(null);

  return (
    <div className='h-screen flex flex-col'>
      <h1 className='text-center bg-gray-800 text-white p-4'>Notes App</h1>
      <div className='flex flex-1'>
        <div className='w-1/4 h-full bg-gray-100 border-r border-gray-300 p-4'>
          <NoteList notes={notes} onSelectNote={setSelectedNote} />
        </div>
        <div className='w-3/4 p-4'>
          {selectedNote ? <NoteEditor note={selectedNote} /> : <div>Select a note</div>}
        </div>
      </div>
    </div>
  );
}

export default NotesPage;
