import React, { useEffect, useState } from 'react';
import { makeStyles, Drawer, Typography, Box, ListItem, ListItemText, ListItemIcon, Avatar, capitalize } from '@material-ui/core';
import { List } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { format } from 'date-fns';
import { AppBar, Toolbar } from '@material-ui/core'
import { useLocation } from "react-router-dom";
import profile from '../constant/mario-av.png'
import { signOut } from 'firebase/auth';
import {
    onAuthStateChanged,
} from 'firebase/auth';

import { Auth } from '../firebase-config.js'
import { red } from '@material-ui/core/colors'
import { AddCircleOutlineOutlined, SubjectOutlined,DoubleArrowOutlined } from '@material-ui/icons';
const drawerWidth = 240;

//arguments can be passed inside makestyles function
const styles = makeStyles((theme) => {
    return {
        page: {
            backgroundColor: '#f9f9f9',
            width: '100%',
            padding: theme.spacing(3),
        },
        title: {
            padding: theme.spacing(2),
        },
        drawer: {
            width: drawerWidth,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        outerMost: {
            display: 'flex',
        },
        button: {
            width: "100%",
            textTransform: 'capitalize'
        },
        active: {
            background: '#f4f4f4',
        },
        appBar: {
            width: `calc(100% - ${drawerWidth}px)`
        },
        toolbar: theme.mixins.toolbar,
        date: {
            flexGrow: '1',
        },
        avatar: {
            marginLeft: theme.spacing(2),
        },
        logout: {
            color: red[500],
            marginLeft: theme.spacing(2),
        },
        disapear: {
            display: "none"
        }
    }
});




const Layout = ({ children }) => {
    const navigateo = useNavigate();
    const location = useLocation();
    const [userName, setUserName] = useState('');

    const classes = styles();


   onAuthStateChanged(Auth,(user)=>{
    if(user){
        
        setUserName(user.displayName);
    }
   })
    const menuItem = [
        {
            name: "My Notes",
            icon: <SubjectOutlined color="secondary" />,
            path: '/notes',

        },
        {
            name: "Create Note",
            icon: <AddCircleOutlineOutlined color="secondary" />,
            path: '/create',

        }
    ]

    const isAuth = () => {
        if (location.pathname === '/' || location.pathname === '/signup') {
            return true;
        }

        else return false;
    }


    return (
        <div className={classes.outerMost}
        >
            <AppBar className={`${classes.appBar} ${isAuth() ? classes.disapear : " "}`}

                elevation={0}>
                <Toolbar>
                    <Typography variant="body1" className={classes.date}>
                        Today is the {format(new Date(), 'do MMMM Y')}.
                    </Typography>

                   
                    {Auth.currentUser && <Typography >{userName}</Typography>}

                    <Avatar className={classes.avatar} src={profile} />
                    <Button
                        className={classes.logout}
                        variant='outlined'
                        endIcon={<DoubleArrowOutlined/>}
                        size="small"
                        onClick={() => {
                            signOut(Auth).then(() => {
                                console.log('signed out')
                            }).catch((err) => {
                                console.log(err.message);
                            })
                            navigateo('/signup')
                        }}

                    >
                        LOGOUT
                    </Button>
                </Toolbar>
            </AppBar>
            <Drawer anchor="left"

                variant="permanent"
                classes={{ paper: classes.drawerPaper }}
                className={`${classes.drawer}  ${isAuth() ? classes.disapear : " "}`}
            >
                <Typography className={classes.title} variant="h5">NoteIt App</Typography>
                <List>
                    {menuItem.map((item) => (
                        <Button className={classes.button} key={item.name} onClick={() => navigateo(item.path)}>
                            <ListItem key={item.name}
                                className={location.pathname === item.path ? classes.active : ''}>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.name} />
                            </ListItem>
                        </Button>

                    ))}
                </List>
            </Drawer>


            <div className={classes.page}>
                <div className={`${classes.toolbar}  ${isAuth() ? classes.disapear : " "}`}></div>
                {children}
            </div>

        </div>
    )
}

export default Layout;