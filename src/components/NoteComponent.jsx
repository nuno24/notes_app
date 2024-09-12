
import { Link } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';


export default function NoteComponent( { title, content, date, handleDelete, id } ){

  const onDeleteClick = (e) => {
    e.stopPropagation(); 
    handleDelete(id);
  };


  return (
    <div className="p-4 rounded shadow-md border m-3 bg-blue-100 hover:bg-blue-200 transition-colors">
      <div className="flex items-start">
        <Link to={`/edit/${id}`} className="block flex-grow">
          <h1 className="text-lg font-bold mb-1 text-left">{title}</h1>
          <p className="text-sm text-left text-gray-700">{content}</p>
          <p className="text-xs text-center text-gray-500 mt-4">{date}</p>
        </Link>
        <IconButton
          aria-label="delete"
          style={{ color: "red", marginRight: "8px" }}
          onClick={onDeleteClick}
        >
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  )
}