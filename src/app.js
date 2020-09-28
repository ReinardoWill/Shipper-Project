import React,{useState,setState,useEffect,useRef} from "react";
import { useSelector, useDispatch } from 'react-redux';
import ReactDOM from "react-dom";
import CarouselComponent from 'Components/carousel.js';
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
  Paper,
  useTheme,
  Hidden  
} from "@material-ui/core";
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DateRangeIcon from '@material-ui/icons/DateRange';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import  {setSearchText} from 'Redux/user.js';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      backgroundColor:'#FFFFFF',
      shadows: ["none"]
    },
    backgroundColor:'#FFFFFF',
    shadows: ["none"]
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
    backgroundColor:'#000000',
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  image:{
    width: 101,
    height: 21,
    margin: 30,
  },
}));




function App(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const search  = useSelector(state => state.user.search);
  const handleChange=(event)=>{
    dispatch(setSearchText(event.target.value));
  } 
  const dispatch = useDispatch();
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <img src="https://shipper.id//assets/img/shipperLogo.png" className={classes.image} />
      <List>
          {['Beranda', 'Driver Management', 'Pickup'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index === 0 ? <HomeIcon /> : index === 1 ? <AccountCircleIcon /> : <DateRangeIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer}>
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
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
