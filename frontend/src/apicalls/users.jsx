import {axiosInstance} from './axiosInstance';
import 'react-toastify/dist/ReactToastify.css';


export const RegisterUser = async(payload)=>{
    try {

        const response = await axiosInstance.post('/api/user/register',payload);
        return response.data;
        
    } catch (error) {
        return error.message
    }
}

export const LoginUser = async (payload) =>{

    try {
        const response = await axiosInstance.post('/api/user/login',payload);    
        console.log(response.data)
        return response.data;
        

    } catch (error) {
        return error.message
    }

}


export const GetCurrentUser = async() =>{
    try {
        const response = await axiosInstance.get('/api/user/get-current-user');
        return response.data;
    } catch (error) {
        return error.message
    }
} 