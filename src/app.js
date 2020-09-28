import React,{useState,setState,useEffect,useRef} from "react";
import { useSelector, useDispatch } from 'react-redux';
import ReactDOM from "react-dom";
import CarouselComponent from 'Components/carousel.js';
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
  ListItemText,
  ListItemIcon,
  Paper
} from "@material-ui/core";
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DateRangeIcon from '@material-ui/icons/DateRange';
import  {setSearchText} from 'Redux/user.js';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	appBar: {
	    width: `calc(100% - ${drawerWidth}px)`,
	    marginLeft: drawerWidth,
      backgroundColor:'#FFFFFF',
      shadows: ["none"]
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
	    backgroundColor: '#E7E6E6',
	    padding: theme.spacing(3),
      display: "flex",
      flexFlow: "column",
      height: "100vh"
	},

  image:{
    width: 101,
    height: 21,
    margin: 30,
  },
  center:{
    align:'center'
  },
  margin:{
    margin: 10
  }
}));

const settings = {
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
};




function App() {
  const classes = useStyles();
  const search  = useSelector(state => state.user.search);
  const handleChange=(event)=>{
    dispatch(setSearchText(event.target.value));
  } 
  const dispatch = useDispatch();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar elevation={0} position="fixed" className={classes.appBar}>
        <Toolbar>
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
        <img src="https://shipper.id//assets/img/shipperLogo.png" className={classes.image} />
        <div className={classes.toolbar} />
        <List>
          {['Beranda', 'Driver Management', 'Pickup'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index === 0 ? <HomeIcon /> : index === 1 ? <AccountCircleIcon /> : <DateRangeIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Paper>
        <Grid container spacing={3}>
          <Grid item xs={6}>
                <Typography variant="body1" gutterBottom>
                  DRIVER MANAGEMENT
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Driver yang bekerja untuk anda
                </Typography>
          </Grid>
          <Grid item xs={2}/>
          <Grid item xs={4}>
            <TextField id="outlined-basic" label="Cari Driver" value={search} onChange={handleChange} variant="outlined" size="small" className={classes.margin} />
          </Grid>
        </Grid>
        </Paper>
        <br/>
        <CarouselComponent />
      </main>
    </div>
  );

}



export default App;

