

export default function Notes() {
  const notes = ["Note 1", "Note 2", "Note 3"]; // Example notes

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h1 className="text-xl font-bold text-center mb-4">Your Notes</h1>
        <button className="w-full mb-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          New Note
        </button>
        <ul className="list-disc pl-5">
          {notes.map((note, index) => (
            <li key={index} className="mb-2">
              {note}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
