import React from 'react';
import { makeStyles, Drawer, Typography, Box, ListItem, ListItemText, ListItemIcon, Avatar } from '@material-ui/core';
import { List } from '@material-ui/core';
import { useNavigate } from 'react-router-dom'
import { Button } from '@material-ui/core';
import { format } from 'date-fns';
import { AppBar, Toolbar } from '@material-ui/core'
import { useLocation } from "react-router-dom";
import profile from '../constant/mario-av.png'
import { AddCircleOutlineOutlined, SubjectOutlined } from '@material-ui/icons';
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
        date:{
            flexGrow:'1',
        },
        avatar:{
            marginLeft:theme.spacing(2),
        }
    }
});




const Layout = ({ children }) => {
    const navigateo = useNavigate();
    const location = useLocation();
    const classes = styles();
    const menuItem = [
        {
            name: "My Notes",
            icon: <SubjectOutlined color="secondary" />,
            path: '/',

        },
        {
            name: "Create Note",
            icon: <AddCircleOutlineOutlined color="secondary" />,
            path: '/create',

        }
    ]
    return (
        <div className={classes.outerMost}>
            <AppBar className={classes.appBar}
                elevation={0}>
                <Toolbar>
                    <Typography variant="body1" className={classes.date}>
                        Today is the {format(new Date(), 'do MMMM Y')}.
                    </Typography>
                    <Typography>
                        Mario
                    </Typography>
                    <Avatar className={classes.avatar} src={profile}/>
                </Toolbar>
            </AppBar>
            <Drawer anchor="left"
                variant="permanent"
                classes={{ paper: classes.drawerPaper }}
                className={classes.drawer}>
                <Typography className={classes.title} variant="h5">Ninja Notes</Typography>
                <List>
                    {menuItem.map((item) => (
                        <Button className={classes.button} onClick={() => navigateo(item.path)}>
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
                <div className={classes.toolbar}></div>
                {children}
            </div>

        </div>
    )
}

export default Layout;