import React, { useState } from "react";
import NoteContext from "./noteContext";
//import { useState } from "react";

const NoteState = (props) =>{
   const host = "http://localhost:5000"
   const notesInitial=[]

  const [notes, setNotes] = useState(notesInitial)

    //get All  Notes
    const getNotes = async ()=>{
        //TODO: API Call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET', 
        headers: {
            'Content-Type': 'application/json',
            'auth-token' : localStorage.getItem('token'),
            
        }
        });
        const json =  await response.json();
        console.log(json)
        setNotes(json)

    }



  //Add a Note
  const addNote = async (title, description, tag)=>{
      //TODO: API Call
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
          'auth-token' : localStorage.getItem('token'),
          //'auth-token' : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM4YWQ5NjE3MWJhNTJjNTYxMmQ3YjU4In0sImlhdCI6MTY3MTAxMDU0OX0.k30sopbkrHyKB6aeAuYihwZqa6gd4ca4qHlYDlWvTKo"
          
        },
        body: JSON.stringify({title, description, tag}) 
      });
      const note =  await response.json();
      setNotes(notes.concat(note));
      
      //console.log(json);
      //console.log("Adding a new Note");
  }



  // Delete a Note
  const deleteNote = async (id)=>{
    //TODO: API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE', 
      headers: {
        'Content-Type': 'application/json',
        'auth-token' : localStorage.getItem('token'),
        //'auth-token' : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM4YWQ5NjE3MWJhNTJjNTYxMmQ3YjU4In0sImlhdCI6MTY3MTAxMDU0OX0.k30sopbkrHyKB6aeAuYihwZqa6gd4ca4qHlYDlWvTKo"
        
      },
       
    });
    const json =  response.json();
    console.log(json);



   console.log("Delete the note with id" + id);
   const newNotes = notes.filter((note)=>{return note._id!==id})
   setNotes(newNotes)
  }



  //Edit a Note
  const editNote = async (id, title, description, tag)=>{

    // TODO: API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: 'PUT', 

        headers: {
          'Content-Type': 'application/json',
          'auth-token' : localStorage.getItem('token'),
          //'auth-token' : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM4YWQ5NjE3MWJhNTJjNTYxMmQ3YjU4In0sImlhdCI6MTY3MTAxMDU0OX0.k30sopbkrHyKB6aeAuYihwZqa6gd4ca4qHlYDlWvTKo"
          
        },
        body: JSON.stringify({title, description, tag}) 
      });
      const json = await response.json();
      console.log(json);
      getNotes();

     /* let newNotes = JSON.parse(JSON.stringify(notes))

    //logic to edit client
      for(let index = 0; index < newNotes.length; index++){
        const element = newNotes[index];
        if(element._id === id){
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag;
        }
        
      }
      //console.log(id, notes);
      setNotes(newNotes);*/
  }


    return (
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;













/*const s1 ={
    "name": "Harry",
    "class": "5b"
   }

   const [state, setState] = useState(s1);
   
   const update = ()=> {

    setTimeout( ()=> {
        setState({
            "name": "Larry",
            "class": "10b"
        })

    }, 1000);

        return (
        <NoteContext.Provider value={{state, update}}>
            {props.children}
        </NoteContext.Provider>
    )

   }*/