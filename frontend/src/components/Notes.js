import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import { useNavigate } from 'react-router-dom'

const Notes = (props) => {

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNotes()
    }
    else {
      navigate("/")
    }
    //eslint-disable-next-line
  }, [])

  const navigate = useNavigate();
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })

  const { showAlert } = props;
  const ref = useRef(null)
  const refClose = useRef(null)

  const handleClick = (e) => {
    e.preventDefault();
    refClose.current.click();
    editNote(note.id, note.etitle, note.edescription, note.etag);
    showAlert('The Note has been Updated', 'success')
  }

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  const updateNote = (currentNote) => {
    ref.current.click()
    setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
  }


  return (
    <>

      {/* Button to trigger edit note modal */}
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      

      {/* modal for edit note  */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog ">
          <div className="modal-content " >
            <div className="modal-header" >
              <h1 >Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div className="modal-body">
              <div className="container my-3" >

                <form onSubmit={handleClick}>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label" style={{ display: 'inline-block', width: '20%', fontSize: "23px" }}><b>Title :</b> </label>
                    <input type="text" className="modalInputs" id="etitle" name="etitle" value={note.etitle} placeholder="Title" onChange={handleChange} minLength={3} required />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="description" className="form-label" style={{ display: 'inline-block', width: '20%', fontSize: "23px" }}> <b>Description :</b> </label>
                    <input type="text" className="modalInputs" id="edescription" name="edescription" value={note.edescription} placeholder="Description" onChange={handleChange} minLength={5} required />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="tag" className="form-label" maxLength={10} style={{ display: 'inline-block', width: '20%', fontSize: "23px" }}><b>Tag :</b>   </label>
                    <input type="text" className="modalInputs" id="etag" name="etag" value={note.etag} placeholder="Tag" onChange={handleChange} />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: "50%", height: "60px", marginLeft: "125px", fontSize: "23px" }}>Submit</button>
                </form>

              </div>
            </div>

            <button type="button" ref={refClose} className="btn btn-secondary d-none" data-bs-dismiss="modal">Close</button>

          </div>
        </div>
      </div>

      

      <div className='row'>
        <h1 className='my-5' style={{fontSize:"60px",fontFamily:"fantasy"}}>Your Notes</h1>
        {notes.length === 0 ? <p className='my-5' style={{fontSize:"30px",fontFamily:"monospace"}}>Your Notes Are Empty</p> : ""}
        {notes.map((note) => {
          return <NoteItem key={note._id} note={note} showAlert={showAlert} updateNote={updateNote} />;
        })}
      </div>
    </>
  )
}

export default Notes
