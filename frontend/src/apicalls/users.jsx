import {axiosInstance} from './axiosInstance';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const RegisterUser = async(payload)=>{
    try {

        const response = await axiosInstance.post('/api/user/register',payload);
        if(response.success){
            toast.success('User created successfully!');
        }
        return response.data;
        
    } catch (error) {
        return error.message
    }
}

export const LoginUser = async (payload) =>{

    try {
        const response = await axiosInstance.post('/api/user/login',payload);
        return response.data;

    } catch (error) {
        return error.message
    }

}