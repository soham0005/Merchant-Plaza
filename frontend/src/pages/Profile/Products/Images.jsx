import { Button, Upload, message } from 'antd'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setLoader } from '../../../redux/slices/loaderSlice';
import { UploadProductImage } from '../../../apicalls/products';

function Images({ selectedProduct, getData, setShowProductForm }) {
  const [showPreview = false,setShowPreview] =  React.useState(true);
  const [file = null, setFile] = useState(null)
  const [images = [], setImages] = React.useState(selectedProduct.images);
  const dispatch = useDispatch();
  const upload = async () => {
    try {
      // console.log("Upload Button Triggered");
      dispatch(setLoader(true));
      const formData = new FormData();
      formData.append("file", file);
      // console.log("Selected Product id:", selectedProduct._id)
      formData.append("productId", selectedProduct._id);
      const response = await UploadProductImage(formData);
      console.log("Response from UploadProductImage:",response);
      dispatch(setLoader(false));

      if (response.status) {
        message.success(response.message);
        setImages([...images,response.data]);
        setShowPreview(false);
        setFile(null);
        getData();
      }
      else {
        message.error(response.message);
      }

    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  }
  return (
    <div>
      <Upload
        listType='picture'
        beforeUpload={() => false}
        onChange={(info) => {
          setFile(info.file);
          setShowPreview(true);
        }}
        showUploadList={showPreview}
      >
      <div className="flex gap-5 mb-5">
      {images.map((image) => {
        return <div className='flex gap-2 border border-solid border-gray-500 rounded p-2 items-end'>
          <img src={image} className='h-20 w-20 objec-cover' alt='' />
          <svg xmlns="http://www.w3.org/2000/svg" className='cursor-pointer' height={20} viewBox="0 0 24 24"><path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"></path></svg>
        </div>
      })}
    </div>
        <Button>Upload Images</Button>
      </Upload>

      <div className="flex justify-end gap-5 mt-5">
        <Button text="primary" onClick={() => {
          setShowProductForm(false);
        }}>
          Cancel
        </Button>
       
        <Button type='primary'
          disabled={!file}
          onClick={upload}
        >Upload</Button>

      </div>
    </div>
  )
}

export default Images
