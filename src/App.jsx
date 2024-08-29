import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Notes from './components/Notes';
import NoteEditor from './components/NoteEditor';


function NotesPage() {


  return (
    <div className='h-screen flex flex-col'>
      <h1 className='text-center bg-gray-800 text-white p-4'>Notes App</h1>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/notes' element={<Notes/>} />
          <Route path='/new' element={<NoteEditor/>} />
          <Route path='/edit/:id' element={<NoteEditor/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default NotesPage;
