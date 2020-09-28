import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import  user from 'Redux/user.js';

const reducer = combineReducers({
	user
})



const store = configureStore({
  reducer,
})



export default store;
