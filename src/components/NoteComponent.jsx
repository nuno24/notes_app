
import { Link } from "react-router-dom";



export default function NoteComponent( { title, content, date, handleDelete, id } ){

  const onDeleteClick = (e) => {
    e.stopPropagation(); 
    handleDelete(id);
  };


  return (
    <div className="p-2 rounded shadow-md w-96 border m-3">
      <Link to={`/edit/${id}`} className="block">
        <h1 className="text-xl font-bold text-center mb-4">{title}</h1>
        <p className="text-center mb-4">{content}</p>
        <p className="text-center mb-4">{date}</p>
      </Link>
      <button 
        className="w-full p-2 bg-red-600 text-white rounded hover:bg-red-400 mt-2"
        onClick={onDeleteClick}
      >
        Del
      </button>
    </div>
  )
}