import { configureStore } from '@reduxjs/toolkit'
import { loader } from './slices/loaderSlice'
import { user } from './slices/userSlice';


const store = configureStore({
    reducer:{
        loader: loader,
        user:user
    }
})

export default store;