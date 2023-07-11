import {axiosInstance} from './axiosInstance';
import 'react-toastify/dist/ReactToastify.css';


// Add Product End Point Integration

export const AddProduct = async(payload)=>{
    try {
        const response = await axiosInstance.post('/api/product/add-product',payload)
        return response.data;
    } catch (error) {
        return error.message
    }
} 

export const GetProducts = async()=>{
    try {
        const response = await axiosInstance.get('/api/product/get-products')
        return response.data;
    } catch (error) {
        
    }
}