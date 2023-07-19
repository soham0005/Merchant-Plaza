import { message } from 'antd';
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

export const GetProducts = async(filters)=>{
    try {
        const response = await axiosInstance.post('/api/product/get-products',filters);
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

export const UploadProductImage = async(payload) =>{
    try {
        // console.log("Before Upload HIt")
        console.log("Payload:",payload)
        const response = await axiosInstance.post("/api/product/upload-image-to-product",payload);
        console.log("Response after Hit",response.data);
        
        return response.data;
    } catch (error) {
        console.log(error.message);
        return error.message;
    }
}