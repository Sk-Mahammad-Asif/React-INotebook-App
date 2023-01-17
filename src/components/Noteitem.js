import React, {useContext} from 'react'
import noteContext from '../context/notes/noteContext';


const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const {note, updateNote} = props;
  return (
    <div className="col-md-3">
        <div className="card" >
        <div className="card-body my-3">
            
            <h3 className="card-title">{note.title}</h3>
            <p className="card-text">{note.description} </p>
            <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id);
              props.showAlert("Deleted Successfully", "success");}}></i>
            <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note);}}></i>
        </div>
        </div>
    </div>
  )
}

export default Noteitem