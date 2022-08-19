import React, { useState } from 'react';
import { Container, Button, Box, Typography, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { pink } from '@material-ui/core/colors';
import { Link, useNavigate } from 'react-router-dom'
import { FormControl, RadioGroup, FormControlLabel } from '@material-ui/core';
import { db } from '../firebase-config'
import Logo from '../constant/OIP.jpg'
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { Auth } from '../firebase-config.js'
import { doc, setDoc, Timestamp } from "firebase/firestore";
const styles = makeStyles({
  outer: {
    display: 'flex',
    flexDirection: "column",
    alignItems: "center",
  },
  box: {
    display: 'flex',
    flexDirection: "column",
    width: "430px",
    margin: "auto",
    borderRadius: "9px",
    boxShadow: "5px 5px 5px #ccc",
    justifyContent: "center",
    alignItems: "center",
    "&:hover": {
      boxShadow: "10px 10px 10px #ccc"
    }
  },

  logo: {
    height: '120px',
    width: '330px',
  },
  title: {
    color: pink[500]
  },
  textField: {
    marginBottom: "20px",
    width: "80%",
  }
})
const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [Uid, setUid] = useState();
  const classes = styles();


  const createUser = async (uid,nodeo) => {
    console.log(Uid);
    await setDoc(doc(db, 'users', uid), nodeo)
    navigate('/create');
  }

  const signupSubmit = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(Auth, email, password).then((cred) => {
      setUid(cred.user.uid);
      const nodeo = {
        notess: [],
        email: cred.user.email
      }
      updateProfile(Auth.currentUser,{displayName:name}).then(()=>{console.log('name added')})
      createUser(cred.user.uid,nodeo);
    })


  }

  

  // onAuthStateChanged(Auth, (user) => {
  //   console.log(user.uid);
  //   if (user) {
      // const nodeo = {
      //   notess: [],
      //   email: user.email,
      // }
  //     setUid(user.uid);
  //     // console.log(Uid);
  //     
  //     // navigate('/create');
  //   }
  

  return (
    <div className={classes.outer}>
      <Box
        component='img'
        src={Logo}
        className={classes.logo}
      />

      <form onSubmit={signupSubmit} noValidate autoComplete='off'>
        <Box className={classes.box} padding={3}>

          <Typography variant="h3"
            className={classes.title} gutterBottom>Sign Up</Typography>
          <TextField
            className={classes.textField}
            value={name}
            onChange={(e) => setName(e.target.value)}
            gutterBottom
            label="Name"
            textDecoration="none"
            color='secondary'
            variant='outlined'
            placeholder='name'
          />
          <TextField
            className={classes.textField}
            gutterBottom
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant='outlined'
            label='Email'
            textDecoration="none"
            color='secondary'
            placeholder='email'
          />
          <TextField
            className={classes.textField}
            gutterBottom
            variant='outlined'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label='create password'
            textDecoration="none"
            color='secondary'
            placeholder='password'
          />
          <Button
            variant="contained"
            textDecoration="none"
            color='secondary'
            type="submit"
          >
            Register
          </Button>
          <Box>
            <Typography variant='body1' >Already have an account?      <span><Link
              style={{ textDecoration: 'none' }} to='/login'>LOGIN</Link></span> </Typography>

          </Box>
        </Box>
      </form>
    </div>


  )
}

export default SignUp