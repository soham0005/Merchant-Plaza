import {createSlice} from '@reduxjs/toolkit'

const userSlice = createSlice({
    name:"User",
    initialState:{
        user: null,
    },
    reducers:{
        setUser:(state,action)=>{
            state.user = action.payload 
        }
    }
})
export const user = userSlice.reducer
export const { setUser } = userSlice.actions;
