import { createSlice } from '@reduxjs/toolkit'

const loaderSlice = createSlice({
    name:"Loader",
    initialState:{
        loading:false
    },
    reducers:{
        setLoader: (state,action)=>{
            state.loading = action.payload
        }
    }
})

export const loader = loaderSlice.reducer
export const {setLoader} = loaderSlice.actions 