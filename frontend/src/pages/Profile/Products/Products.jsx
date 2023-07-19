import { Button, Table, message } from 'antd'
import React, { useEffect, useState } from 'react'
import ProductForm from './ProductForm';
import { useDispatch, useSelector } from 'react-redux';
import { setLoader } from '../../../redux/slices/loaderSlice';
import { DeleteProduct, GetProducts } from '../../../apicalls/products';
import moment from 'moment'

function Products() {
    const [showProductForm,setShowProductForm] = useState(false);
    const [selectedProduct,setSelectedProduct] = useState(null);
    const [products,setProducts] = useState([]);
    const {user} = useSelector((state)=> state.user);
    const dispatch = useDispatch();

    const deleteProduct = async(id)=>{
      try {
        dispatch(setLoader(true));
        const response = await DeleteProduct(id);
        console.log("Front End Delete API response:",response);
        dispatch(setLoader(false));

        if(response.status){
          message.success(response.message);
          // Reloading the Data inorder to display in table
          getData();
        }
        else{
          message.error(response.message);
        }

      } catch (error) {
        dispatch(setLoader(false));
        message.error(error.message);
      }
    }



    const getData = async()=>{
      try {
        dispatch(setLoader(true));
        const response = await GetProducts({
          seller:user._id
        });
        dispatch(setLoader(false));
        console.log("Products: ",response.message);
        if(response?.status){
          setProducts(response.message);
        }
        
      } catch (error) {
        dispatch(setLoader(false));
        message.error("No Products");
      }

    }
    const columns = [
      {
        title:"Name",
        dataIndex:"name"
      },
      {
        title:"Description",
        dataIndex:"description"
      },
      {
        title:"Price",
        dataIndex:"price"
      },
      {
        title:"Category",
        dataIndex:"category"
      },
      {
        title:"Age",
        dataIndex:"age"
      },
      {
        title:"Added On",
        dataIndex:"createdAt",
        render: (text,record) =>{
          return moment(record.createdAt).format("DD-MM-YYYY hh:mm A");
        }
      },

      {
        title:"Status",
        dataIndex:"status"
      },
      {
        title:"Action",
        dataIndex:"action",
        render:(text,record) =>{
          return (
            <div className="flex gap-5">
            
            <svg xmlns="http://www.w3.org/2000/svg" onClick={()=>{deleteProduct(record._id)}} className='cursor-pointer' height={20} viewBox="0 0 24 24"><path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"></path></svg>

            <svg xmlns="http://www.w3.org/2000/svg" onClick={()=>{  setSelectedProduct(record);
            setShowProductForm(true);

                       }} className='cursor-pointer' height={20} viewBox="0 0 24 24"><path d="M15.7279 9.57629L14.3137 8.16207L5 17.4758V18.89H6.41421L15.7279 9.57629ZM17.1421 8.16207L18.5563 6.74786L17.1421 5.33365L15.7279 6.74786L17.1421 8.16207ZM7.24264 20.89H3V16.6474L16.435 3.21233C16.8256 2.8218 17.4587 2.8218 17.8492 3.21233L20.6777 6.04075C21.0682 6.43128 21.0682 7.06444 20.6777 7.45497L7.24264 20.89Z"></path></svg>



            </div>
          )
        }
      },
    ]

   


    useEffect(()=>{
      getData();
    },[])
  return (
    <div>
      <div className="flex justify-end mb-2">

        <Button type='default' onClick={()=> {
          setSelectedProduct(null);
          setShowProductForm(true)}}>Add Product</Button>

      </div>
      <Table columns={columns} dataSource={products}  /> 
      {showProductForm && <ProductForm showProductForm={showProductForm} setShowProductForm={setShowProductForm} selectedProduct={selectedProduct} getData={getData}/>}

    </div>
  )
}

export default Products
