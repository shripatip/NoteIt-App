import { Typography, Button, ButtonGroup, FormLabel, FormControlLabel } from '@material-ui/core'
import React, { useState } from 'react'
import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import KeyboardArrowRightOutlinedIcon from '@material-ui/icons/KeyboardArrowRightOutlined';
import { TextField } from '@material-ui/core';
import { Radio } from '@material-ui/core'
import { FormControl, RadioGroup } from '@material-ui/core';
import { pink } from "@material-ui/core/colors"
import axios from 'axios'
import { addDoc } from 'firebase/firestore'
import { notesCollectionRef, Auth, db } from '../firebase-config'
import { useNavigate } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";
import {
  onAuthStateChanged,
} from 'firebase/auth';
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { CollectionsBookmarkOutlined } from '@material-ui/icons';

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    width: "100%"
  },
  header: {
    color: pink[500],
    marginTop: 20,
  }
});
export default function Create() {
  const classes = useStyles();
  const [user] = useAuthState(Auth);
  const [title, setTitle] = useState('');
  const [details, setDetail] = useState('');
  const [detailError, setDetailError] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [catagory, setCatagory] = useState('todos');
//  console.log(user);
  const navigate = useNavigate();

  const currentUser=Auth.currentUser;


  const submitForm = (e) => {
    e.preventDefault();
    setDetailError(false);
    setTitleError(false);
    if (title === " ") {
      setTitleError(true);
    }
    if (details === " ") {
      setDetailError(true);
    }
    if (title && details) {
      const createNote = async () => {
        const email = user.email
        const node = {
          title: title,
          details: details,
          catagory: catagory,
        }
        
const userSpecificRef=doc(db,'users',user.uid)

await updateDoc(userSpecificRef,{
  notess:arrayUnion(node)
})
navigate('/notes');
        





        // await addDoc(notesCollectionRef, {
        //   title, details, catagory,email,
        // }).then((res) => {
        //   console.log(res)
        //   console.log(user)
        //   navigate("/");
        // })
      }
      createNote();
    }
  }
  return (
    <Container>
      <Typography
        className={classes.header}
        variant='h5'
        component='h3'
        color='secondary'
        gutterBottom
      >
        Create a New Note
      </Typography>
      <form noValidate autoComplete='off' onSubmit={submitForm}>
        <TextField
          value={title}
          onChange={(e) => {
            setTitle(e.target.value)
          }}
          className={classes.field}
          required
          textDecoration="none"
          color='secondary'
          variant="outlined"
          label="Note Title"
          error={titleError} />
        <TextField
          className={classes.field}
          value={details}
          onChange={(e) => setDetail(e.target.value)}
          required
          textDecoration="none"
          color='secondary'
          multiline
          minRows="4"
          variant="outlined"
          label="Details"
          error={detailError} />
        <FormControl className={classes.field}>
          <FormLabel >Note Category</FormLabel>
          <RadioGroup value={catagory} onChange={(e) => setCatagory(e.target.value)}>
            <FormControlLabel control={<Radio />} label="Money" value="money" />
            <FormControlLabel control={<Radio />} label="Todos" value="todos" />
            <FormControlLabel control={<Radio />} label="Remainder" value="remainder" />
            <FormControlLabel control={<Radio />} label="Work" value="work" />
          </RadioGroup>
        </FormControl>
        <br />

        <Button
          variant='contained'
          type='submit'
          color='secondary'


          endIcon={<KeyboardArrowRightOutlinedIcon />}
        >
          SUBMIT
        </Button>
      </form>

    </Container>
  )
}
