import React, { useState } from 'react';
import { Container, Button, Box, Typography, TextField, } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { FormControl, RadioGroup, FormControlLabel } from '@material-ui/core';
import { pink } from '@material-ui/core/colors';
import { signInWithEmailAndPassword ,
onAuthStateChanged} from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom'
import { Auth } from '../firebase-config.js';
import Logo from '../constant/OIP.jpg'

const styles = makeStyles({
    outer: {
        display: 'flex',
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",


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
        marginBottom: '30px',

    },
    title: {
        color: pink[500]
    },
    textField: {
        marginBottom: "20px",
        width: "80%",


    }
})

const Login = () => {
    const classes = styles();
    const navigate = useNavigate();
    const [emailo, setEmail] = useState('');
    const [passwordo, setPassword] = useState('');
    const loginOnSubmit= (e) => {
        e.preventDefault();
        console.log("hii");
        signInWithEmailAndPassword(Auth, emailo, passwordo).then((cred) => {
            console.log('loged in person', cred);
        }).catch((error) => {
            console.log(error.message);
        })
    }
    onAuthStateChanged(Auth,(user)=>{
if(user){
    navigate('/');
}})
    
    return (
        <div className={classes.outer}>
            <Box
                component='img'
                src={Logo}
                className={classes.logo}
            />
            <form onSubmit={loginOnSubmit} noValidate autoComplete='off'>
                <Box className={classes.box} padding={3}>
                    <Typography variant="h3"
                        className={classes.title} gutterBottom>Login</Typography>

                    <TextField
                        className={classes.textField}
                        gutterBottom
                        variant='outlined'
                        value={emailo}
                        onChange={(e) => setEmail(e.target.value)}
                        label='Email'
                        textDecoration="none"
                        color='secondary'
                        placeholder='Email'
                    />
                    <TextField
                        className={classes.textField}
                        gutterBottom
                        variant='outlined'
                        label='Password'
                        value={passwordo}
                        onChange={(e) => setPassword(e.target.value)}
                        textDecoration="none"
                        color='secondary'
                        placeholder='Password'
                    />
                    <Button
                        variant="contained"
                        textDecoration="none"
                        color='secondary'
                        type="submit"  
                    >
                        Login
                    </Button>
                    <Box>
                        <Typography variant='body1' >Crete an Account..      <span><Link
                            style={{ textDecoration: 'none' }} to='/signup'>SIGN UP</Link></span> </Typography>
                    </Box>
                </Box>
            </form>
        </div>


    )
}

export default Login