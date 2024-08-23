import { useState } from "react";
import noteContext from "./noteContext";
import axios from "axios"

const NoteState = (props) => {
    
    axios.defaults.withCredentials=true;

    const host = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
    let notesInitial = [];
    const [notes, setNotes] = useState(notesInitial);

    //Get a Note


    const getNotes = async () => {
        //API Call

        const response = await axios.get(`${host}/api/notes/fetchnotes`, {
            
            headers: {
                "auth-token": localStorage.getItem('token')
            }
        });
        const json = await response.json();
        setNotes(json);

    }


    //Add a Note


    const addNote = async (title, description, tag) => {
        
        //API Call

        try {
            const response = await axios.post(`${host}/api/notes/createnotes`, {
               
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem('token')
                },
                body: JSON.stringify({ title, description, tag })
            });
            const json = await response.json();
            setNotes(notes.concat(json));
        }catch (error) {
            console.error("Failed to add note:", error);
        }
    }

    //Delete a Note

    const deleteNote = async (id) => {

        //API Call
        await axios.delete(`${host}/api/notes/deletenotes/${id}`, {
           
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
        });

        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
    }

    //Edit a Node
    const editNote = async (id, title, description, tag) => {
        //API Call
        await axios.put(`${host}/api/notes/updatenotes/${id}`, {
            
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });

        //Logic to edit

        let newNotes=JSON.parse(JSON.stringify(notes))

        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }


    return (
        <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </noteContext.Provider>
    )

}

export default NoteState;
