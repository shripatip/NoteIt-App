import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import NoteCard from '../components/noteCard'
import { notesCollectionRef ,db} from '../firebase-config';
import { deleteDoc,doc, getDocs } from 'firebase/firestore';
import Masonry from 'react-masonry-css';

export default function Notes() {

  const [notes, setNotes] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const notesData = await getDocs(notesCollectionRef);
      console.log(notesData);
      const extractedData=notesData.docs.map((note) => (
       ({ ...note.data(), id: note.id })
      ))
      console.log(extractedData)
      setNotes(extractedData);
      // setNotes(data);
    }
    getData();

  }, []);

console.log(notes);
  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1,
  }
  const deleteNote = async (id) => {
    const docRef=doc(db,'notes',id);
    deleteDoc(docRef);
    const newNotes = notes.filter((note) => note.id !== id);
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
          <div key={note.id} >
            <NoteCard note={note} deleteNote={deleteNote} />
          </div>
        ))}
      </Masonry>

    </Container>
  )
}
