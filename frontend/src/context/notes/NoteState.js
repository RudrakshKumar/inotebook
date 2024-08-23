import { useState } from "react";
import noteContext from "./noteContext";
import axios from "axios";

const NoteState = (props) => {

    axios.defaults.withCredentials = true;

    const host = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
    let notesInitial = [];
    const [notes, setNotes] = useState(notesInitial);

    // Get Notes
    const getNotes = async () => {
        try {
            
            const response = await axios.get(`${host}/api/notes/fetchnotes`, {
                headers: {
                    "auth-token": localStorage.getItem('token'),
                },
            });
            setNotes(response.data);  // Directly use response.data
        } catch (error) {
            console.error("Failed to fetch notes:", error);
        }
    };

    // Add Note
    const addNote = async (title, description, tag) => {
        try {
            const response = await axios.post(`${host}/api/notes/createnotes`, 
                { title, description, tag }, // Data goes here
                {
                    headers: {
                        'Content-Type': 'application/json',
                        "auth-token": localStorage.getItem('token'),
                    },
                }
            );
            setNotes(notes.concat(response.data));  // Use response.data
        } catch (error) {
            console.error("Failed to add note:", error);
        }
    };

    // Delete Note
    const deleteNote = async (id) => {
        try {
            await axios.delete(`${host}/api/notes/deletenotes/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem('token'),
                },
            });

            const newNotes = notes.filter((note) => note._id !== id);
            setNotes(newNotes);
        } catch (error) {
            console.error("Failed to delete note:", error);
        }
    };

    // Edit Note
    const editNote = async (id, title, description, tag) => {
        try {
            await axios.put(`${host}/api/notes/updatenotes/${id}`, 
                { title, description, tag }, // Data goes here
                {
                    headers: {
                        'Content-Type': 'application/json',
                        "auth-token": localStorage.getItem('token'),
                    },
                }
            );

            // Logic to edit
            let newNotes = JSON.parse(JSON.stringify(notes));
            for (let index = 0; index < newNotes.length; index++) {
                const element = newNotes[index];
                if (element._id === id) {
                    newNotes[index].title = title;
                    newNotes[index].description = description;
                    newNotes[index].tag = tag;
                    newNotes[index].date = Date.now();
                    break;
                }
            }
            setNotes(newNotes);
        } catch (error) {
            console.error("Failed to edit note:", error);
        }
    };

    return (
        <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </noteContext.Provider>
    );
};

export default NoteState;
