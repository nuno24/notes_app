const NoteEditor = () => {
  return (
    <div className="h-full">
      <input 
        className="w-full mb-4 p-2 border border-gray-300 rounded" 
        type="text" 
        placeholder="Enter title" 
      />
      <textarea 
        className="w-full h-64 p-2 border border-gray-300 rounded" 
        placeholder="Enter note"
      />
      <button className="mt-4 bg-blue-500 text-white p-2 rounded">
        Add
      </button>
    </div>
  );
}

export default NoteEditor;
