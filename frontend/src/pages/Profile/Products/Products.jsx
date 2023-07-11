import { Button, Table, message } from 'antd'
import React, { useEffect, useState } from 'react'
import ProductForm from './ProductForm';
import { useDispatch } from 'react-redux';
import { setLoader } from '../../../redux/slices/loaderSlice';
import { GetProducts } from '../../../apicalls/products';

function Products() {
    const [showProductForm,setShowProductForm] = useState(false);
    const [selectedProduct,setSelectedProduct] = useState(null);
    const [products,setProducts] = useState([]);
    const dispatch = useDispatch();


    const getData = async()=>{
      try {
        dispatch(setLoader(true));
        const response = await GetProducts();
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
        title:"Status",
        dataIndex:"status"
      },
      {
        title:"Action",
        dataIndex:"action",
      },
    ]

    useEffect(()=>{
      getData();
    },[])
  return (
    <div>
      <div className="flex justify-end mb-2">

        <Button type='default' onClick={()=> setShowProductForm(true)}>Add Product</Button>

      </div>
      <Table columns={columns} dataSource={products}  /> 
      {showProductForm && <ProductForm showProductForm={showProductForm} setShowProductForm={setShowProductForm}/>}

    </div>
  )
}

export default Products
