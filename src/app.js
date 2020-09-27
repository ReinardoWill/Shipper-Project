import React,{useState,setState,useEffect,useRef} from "react";
import { useSelector, useDispatch } from 'react-redux';
import ReactDOM from "react-dom";
import  {fetchMovie,updateReset} from 'Redux/movie.js';
import MovieCard from 'Components/moviecard.js';
import PosterModal from 'Components/postermodal.js';
import Details from 'Components/details.js';
import { BrowserRouter as Router,Switch,Route } from "react-router-dom";
import {
  AppBar,
  Typography,
  Box,
  CssBaseline,
  makeStyles,
  Container,
  Grid,
  Toolbar,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  InputBase ,
  fade,
  Menu,
  MenuItem,
  IconButton ,
  Badge ,
  Drawer,
  Divider,
  List ,
  ListItem ,
  ListItemText
} from "@material-ui/core";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';




const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	appBar: {
	    width: `calc(100% - ${drawerWidth}px)`,
	    marginLeft: drawerWidth,
	},
	drawer: {
	    width: drawerWidth,
	    flexShrink: 0,
	},
	drawerPaper: {
	    width: drawerWidth,
	},
	  // necessary for content to be below app bar
	toolbar: theme.mixins.toolbar,
	content: {
	    flexGrow: 1,
	    backgroundColor: theme.palette.background.default,
	    padding: theme.spacing(3),
	},
}));



function App() {
  	const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Shipper Project
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
      </main>
    </div>
  );

}



export default App;

