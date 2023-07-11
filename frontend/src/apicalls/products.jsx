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
        return error.message
    }
}

export const EditProduct = async(id,payload) =>{
    try {
        console.log("id and payload:",id,payload)
        const response = await axiosInstance.put(`/api/product/edit-product/${id}`,payload)
        // console.log("Response After hit on Edit Product",response);
        return response.data
    
    } catch (error) {
        return error.message;
    }
}


export const DeleteProduct = async(id) =>{
    try {
        const response = await axiosInstance.delete(`/api/product/delete-product/${id}`);
        console.log("Delete APi Called :",response);
        return response.data;
    } catch (error) {
        return error.message;
    }
}