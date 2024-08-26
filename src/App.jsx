import Login from './components/Login';
import './App.css';




function NotesPage() {


  return (
    <div className='h-screen flex flex-col'>
      <h1 className='text-center bg-gray-800 text-white p-4'>Notes App</h1>
      <Login/>
    </div>
  );
}

export default NotesPage;
