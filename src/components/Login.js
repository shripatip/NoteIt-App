import React, { useState } from 'react';
import { Container, Button, Box, Typography, TextField, } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { FormControl, RadioGroup, FormControlLabel } from '@material-ui/core';
import { pink } from '@material-ui/core/colors';
import {
    signInWithEmailAndPassword,
    onAuthStateChanged
} from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom'
import { Auth } from '../firebase-config.js';
import Logo from '../constant/OIP.jpg'
import LoginIcon from '@material-ui/icons/LabelOff';
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
        color: pink[500],
        marginBottom: "20px",
    },
    textField: {
        marginBottom: "20px",
        width: "80%",


    }
})

const Login = () => {
    const classes = styles();
    const navigate = useNavigate();
    const [emailo, setEmail] = useState('realtest@gmail.com');
    const [passwordo, setPassword] = useState('1234567');
    const loginOnSubmit = (e) => {
        e.preventDefault();

        signInWithEmailAndPassword(Auth, emailo, passwordo).then((cred) => {

            navigate('/notes');
        }).catch(err => { alert(err.code) });
    }
    onAuthStateChanged(Auth, (user) => {
        if (user) {

        }
    })

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
                        className={classes.title} >Login</Typography>

                    <TextField
                        className={classes.textField}
                        gutterbottom='true'
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
                        gutterbottom='true'
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
                        endIcon={<LoginIcon />}
                    >
                        Login
                    </Button>
                    <Box mt={1}>
                        <Typography variant='body1' >Crete an Account ...<span><Link
                            style={{ textDecoration: 'none' }} to='/signup'>   SIGN UP</Link></span> </Typography>
                    </Box>
                </Box>
            </form>
        </div>


    )
}

export default Login