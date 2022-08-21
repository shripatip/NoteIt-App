import React from 'react'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { Avatar, Typography } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import { DeleteOutlined } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import { IconButton } from '@material-ui/core';
import { blue, green, pink, yellow } from '@material-ui/core/colors';


const styles = makeStyles({

    avatar: {
        backgroundColor: (note) => {
            if (note.catagory == 'work') {
                return yellow[700]
            }
            if (note.catagory == 'todos') {
                return green[500]
            }

            if (note.catagory == 'remainder') {
                return pink[500]
            }
            if (note.catagory == 'money') {
                return blue[500]
            }
        }
    }

})
const NoteCard = ({ note, deleteNote }) => {

    const classes = styles(note);
    return (
        <Card elevation={1} className={classes.test}>
            <CardHeader
                avatar={
                    <Avatar className={classes.avatar}>
                        {note && note.catagory[0].toUpperCase()}
                    </Avatar>
                }
                action={<IconButton onClick={() => deleteNote(note)}>
                    <DeleteOutlined />
                </IconButton>}
                title={note.title}
                subheader={note.catagory}
            />
            <CardContent>
                <Typography variant='body2' color="textSecondary">{note.details}</Typography>
            </CardContent>

        </Card>
    )
}

export default NoteCard