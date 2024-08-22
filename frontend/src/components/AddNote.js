import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';

const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag)
        setNote({ title: "", description: "", tag: "" });
        if (props.inputRef && props.inputRef.current) {
            props.inputRef.current.click();  // Use inputRef to trigger click
        }
        props.showAlert('The Note has been Added', 'success')
    }

    const handleChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }



    return (

        <div className="container my-3" >
            <form onSubmit={handleClick}>
                <div className="mb-3">
                    <input type="text" className="modalInputs" id="title" name="title" placeholder="Title" value={note.title} onChange={handleChange} minLength={3} required />
                </div>
                <div className="mb-3">
                    <input type="text" className="modalInputs" id="description" name="description" placeholder="Description" value={note.description} onChange={handleChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <input type="text" className="modalInputs" id="tag" name="tag" maxLength={10} placeholder="Tag" value={note.tag} onChange={handleChange}  />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: "50%", height: "60px",marginLeft:"15px",fontSize: "23px" }} >Add Note</button>
            </form>
        </div>
    )
}

export default AddNote
