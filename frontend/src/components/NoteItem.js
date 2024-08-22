import React, { useContext } from 'react'
import deleteIcon from './delete.png';
import editIcon from './edit.png';
import noteContext from '../context/notes/noteContext';



const NoteItem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, showAlert, updateNote } = props;

    const dateInIST = new Date(new Date(note.date).toGMTString()).toLocaleString('en-IN',
        {
            timeZone: 'Asia/Kolkata',
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true 
        });

    return (
        <div className='col-md-4'>

            <div className="card my-3">
                <span className="cardBadge position-absolute top-0 start-50 translate-middle badge rounded-pill ">
                    {note.tag}
                </span>
                <div className="card-body">
                    <b className="card-title" style={{ fontFamily: "monospace", fontSize: "25px" }}>{note.title}</b><hr />
                    <p className="card-text" style={{ fontSize: "20px", fontStyle: "oblique" }}>{note.description}  </p>
                    <hr />
                    <div className="icondiv d-flex justify-content-center" >
                        <img className='icons mx-5' src={deleteIcon} alt="Delete" width="40px" height="40px" onClick={() => { deleteNote(note._id); showAlert('The Note has been Deleted', 'success') }} />
                        <img className='icons mx-5' src={editIcon} alt="Edit" width="40px" height="40px" onClick={() => { updateNote(note) }} />
                    </div><hr/>
                    <div className="icondiv d-flex justify-content-center" >
                        Last Updated on {dateInIST}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default NoteItem
