

const NoteList = ({ notes }) => {
  return (
    <div className="h-full">
      <h1 className="font-bold text-center text-2xl p-3">Notes List</h1>
      <ul>
        {notes.map(note => (
          <li className="border-2 rounded m-1 border-black hover:" key="note.id" >
            <h2 className="text-lg font-bold">{note.title}</h2>
            <p className="text-xs">{note.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NoteList;
