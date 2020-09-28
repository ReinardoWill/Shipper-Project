import React,{useState,setState,useEffect,useRef,useCallback} from "react";
import { useSelector, useDispatch } from 'react-redux';
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
  Avatar,
} from "@material-ui/core";
import  {fetchUser,setUserFromStorage} from 'Redux/user.js';
import Carousel from 'react-material-ui-carousel';



const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
}));




export default function CarouselComponent() {
	const slider = useRef();
	const classes = useStyles();
	const [indexState, setIndexState] = useState(0);
	const next= ()=> {
		setIndexState(indexState+1);
    	slider.current.next();
  	}
	const previous=()=> {
		setIndexState(indexState-1);
	    slider.current.prev();
	}
	const users  = useSelector(state => state.user.users);
	const [usersState, setUsersState] = useState([]);
	const search  = useSelector(state => state.user.search);
	const splitter=(inputArray)=>{
		let perChunk = 5;
		let result = inputArray.reduce((resultArray, item, index) => { 
		  const chunkIndex = Math.floor(index/perChunk)

		  if(!resultArray[chunkIndex]) {
		    resultArray[chunkIndex] = [] // start a new chunk
		  }

		  resultArray[chunkIndex].push(item)

		  return resultArray
		}, [])
		return result;
	}


	const dispatch = useDispatch();
	useEffect(() => {
		console.log(users);
	    if(!users.hasOwnProperty('results') ){
	    	(async () => {
	    		if(!sessionStorage['users']){
	    			 const funct1 = await dispatch(fetchUser());
	    		}else{
	    			const funct2 = await dispatch(setUserFromStorage(JSON.parse(sessionStorage.getItem('users'))));
	    		}
	    	})();
	    }
 	});

 	useEffect(() => {
 		if(users.hasOwnProperty('results')){
 			setUsersState([...splitter(users.results)]);
	    }
 	},[users]);

 	useEffect(() => {
 		if(users.hasOwnProperty('results') && search!=''){
 			setUsersState([...splitter(users.results.filter(obj=>obj.name.first==search))])
	    }
	    else if(users.hasOwnProperty('results') && search==''){
	    	setUsersState([...splitter(users.results)]);
	    }
 	},[search]);


	return (
		usersState.length>0 &&
		<div>
			<div>
				<Carousel ref={slider} navButtonsAlwaysInvisible={true} autoPlay={false} animation="slide" indicators={false}>
		            {
		                usersState.map( (item, i) =><Item key={i} item={item} />)
		            }
        		</Carousel>
			</div>
			<div>
				<Grid container spacing={3}>
		            <Grid item xs={4}/>
		            <Grid item xs={6}>
		              <Grid container spacing={3}>
		                <Grid item xs={6}>
		                  <Button disabled={indexState==0? true:false} onClick={previous}>Previous</Button>
		                </Grid>
		                <Grid item xs={6}>
		                  <Button disabled={indexState==usersState.length-1? true:false} onClick={next}>Next</Button>
		                </Grid>
		              </Grid>
		            </Grid>
		            <Grid item xs={4}/>
		        </Grid>
			</div>
        </div>
	);
}


function Item(props)
{
	const classes = useStyles();
    return (
    	<div>
    		{props.item.length>0 &&
    		<Grid container spacing={3}>
    			{props.item.map((user,i)=>{
    				var d =new Date(user.dob.date);
    				return (
    					<Grid item xs={3}>
		    				<Card key={i}>
					    		<CardContent>
					    			<Grid container spacing={3}>
					    				<Grid item xs={4}/>
					    				<Grid item xs={6}>
					    					<Avatar src={user.picture.large} className={classes.large}/>
					    				</Grid>
					    				<Grid item xs={4}/>
					    			</Grid>
					    			<Grid container spacing={3}>
					    				<Grid item xs={12}>
					    					<Typography variant="body2" gutterBottom>
				      							Nama Driver
      										</Typography>
					    					<Typography variant="body1" gutterBottom>
				      							{user.name.first+' '+user.name.last}
      										</Typography>
					    				</Grid>
					    			</Grid>
					    			<Grid container spacing={3}>
					    				<Grid item xs={12}>
					    					<Typography variant="body2" gutterBottom>
				      							Telepon
      										</Typography>
					    					<Typography variant="body1" gutterBottom>
				      							{user.cell}
      										</Typography>
					    				</Grid>
					    			</Grid>
					    			<Grid container spacing={3}>
					    				<Grid item xs={12}>
					    					<Typography variant="body2" gutterBottom>
				      							Email
      										</Typography>
					    					<Typography variant="body1" gutterBottom>
				      							{user.email}
      										</Typography>
					    				</Grid>
					    			</Grid>
					    			<Grid container spacing={3}>
					    				<Grid item xs={12}>
					    					<Typography variant="body2" gutterBottom>
				      							Tanggal Lahir
      										</Typography>
					    					<Typography variant="body1" gutterBottom>
					    						{d.getFullYear()+'-'+("0"+(d.getMonth()+1)).slice(-2)+'-'+("0" + d.getDate()).slice(-2)}
      										</Typography>
					    				</Grid>
					    			</Grid>
					    		</CardContent>
					    	</Card>
		    			</Grid>
    				)
    			})}
    		</Grid>
    		}
    	</div>
    	
    )
}
