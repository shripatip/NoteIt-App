import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import NoteCard from '../components/noteCard'
import { notesCollectionRef, db, Auth } from '../firebase-config';
import { arrayRemove, deleteDoc, doc, getDoc, setIndexConfiguration, updateDoc } from 'firebase/firestore';
import Masonry from 'react-masonry-css';
import {
  onAuthStateChanged,
} from 'firebase/auth';

export default function Notes() {

  const [uid, setUid] = useState();
  const [notes, setNotes] = useState([]);
  // setTimeout(()=>{if(Auth){
  //   setUid(Auth.currentUser.uid)}
  // console.log(uid)},1000);


  onAuthStateChanged(Auth, (user) => {
    if (user) {
        setUid(user.uid);
        }
    }
  )

  
    useEffect(() => {
      const getData = async () => {
        if(uid){
          const notesData = await getDoc(doc(db, 'users', uid));
        
          if (notesData.exists()) {
            setNotes(notesData.data().notess);
          }
        }
      }
      getData();

    }, [uid,notes]);

  
  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1,
  }
  const deleteNote = async (note) => {
    console.log(note);
    const docRef = doc(db, 'users', uid);
     await updateDoc(docRef,{
      notess:arrayRemove(note)})
    const newNotes = notes.filter((noteo) => noteo!== note);
    setNotes(newNotes);
  }
  return (
    <Container>
      <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {notes.map((note) => (
          <div key={notes.indexOf(note)} >
            <NoteCard note={note} deleteNote={deleteNote} />
          </div>
        ))}
      </Masonry>

    </Container>
  )
}
