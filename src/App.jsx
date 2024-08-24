import './App.css';
import NoteList from './components/NoteList';
import NoteEditor from './components/NoteEditor';

const fakeNotes = [
  { id: 1, title: "first note", content: "The first note content" },
  { id: 2, title: "second note", content: "The second note content" },
  { id: 3, title: "third note", content: "The third note content" },
  { id: 4, title: "fourth note", content: "The fourth note content" },
]

function NotesPage() {
  return (
    <div className='h-screen flex flex-col'>
      <h1 className='text-center bg-gray-800 text-white p-4'>Hello</h1>
      <div className='flex flex-1'>
        <div className='w-1/4 h-full bg-gray-100 border-r border-gray-300 p-4'>
          <NoteList notes={fakeNotes} />
        </div>
        <div className='w-3/4 p-4'>
          <NoteEditor />
        </div>
      </div>
    </div>
  );
}

export default NotesPage;
