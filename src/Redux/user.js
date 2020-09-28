import { createSlice } from '@reduxjs/toolkit';
import ApiService from 'Services/apiservice.js';

export const slice = createSlice({
    name: 'user',
    initialState: {
        users: [],
        search:''
    },
    reducers: {
        setUser: (state, action) => {
            state.users = action.payload;
        },
        setSearch: (state, action) => {
            state.search = action.payload;
        }
    },
});


export default slice.reducer;


const { setUser,setSearch } = slice.actions;

export const fetchUser = () => async dispatch => {
    try {
        await ApiService.fetchUsers()
            .then((response) =>{
                sessionStorage.setItem('users', JSON.stringify(response));
                dispatch(setUser(response));
            });
    }	
    catch (e) {
        return console.error(e.message);
    }
}

export const setUserFromStorage= (user) => dispatch=>{
    dispatch(setUser(user));
}

export const setSearchText= (text) => dispatch=>{
    dispatch(setSearch(text));
}
