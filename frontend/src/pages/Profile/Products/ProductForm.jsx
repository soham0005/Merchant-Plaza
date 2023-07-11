import Modal from 'antd/es/modal/Modal'
import React, { useEffect, useRef } from 'react'
import { Col, Form, Input, Row, Tabs, message } from 'antd'
import Products from './Products'
import {useDispatch, useSelector} from 'react-redux'
import TextArea from 'antd/es/input/TextArea'
import { setLoader } from '../../../redux/slices/loaderSlice';
import { AddProduct } from '../../../apicalls/products'

function ProductForm({ showProductForm, setShowProductForm,selectedProduct }) {
    const formRef = React.useRef(null);
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const onFinish = async (values) => {
        // console.log(values);
        try {
            values.seller = user._id;
            values.status = "pending";
            dispatch(setLoader(true))
            const response = await AddProduct(values);
            dispatch(setLoader(false));

            console.log("Response From Add Products:",response);

            if(response.status){
                message.success(response.message);
                setShowProductForm(false);

            }
            else{
                message.error(response.message);
            }


        } catch (error) {
            dispatch(setLoader(false));
            message.error(error.message);
        }
    }
    const additionalThings = [
        {
            label: "Bill Available",
            name: "billAvailable"
        },
        {
            label: "Warrenty Available",
            name: "warrentAvailable"
        },
        {
            label: "Box Available",
            name: "boxAvailable"
        },
        {
            label: "Accessories Available",
            name: "accessoriesAvailable"
        },
    ]

    const rules = [
        {
            required: true,
            message: "Required"
        }
    ]

    useEffect(()=>{
        if(selectedProduct){
            formRef.current.setFieldsValue(selectedProduct);
        }
    })
    return (
        <Modal
            title="Forum"
            open={showProductForm}
            onCancel={() => setShowProductForm(false)}
            centered
            width={1000}
            okText="Save"
            onOk={() => {
                formRef.current.submit();
            }}
        >
            <div>
                <text className="xl text-primary">
                {selectedProduct ? "Edit Product" : "Add Product"}
                </text>
                <Tabs defaultActiveKey='1'>
                    <Tabs.TabPane tab="General" key="1">
                        <Form layout='vertical' ref={formRef} onFinish={onFinish}>

                            <Form.Item label="Name" name='name' rules={rules}>
                                <Input type='text'></Input>
                            </Form.Item>

                            <Form.Item label="Description" name='description' rules={rules}>
                                <TextArea type='text' />
                            </Form.Item>

                            <Row gutter={[16, 16]}>
                                <Col span={8}>
                                    <Form.Item label="Price" name='price' rules={rules}>
                                        <Input type='number' />
                                    </Form.Item>
                                </Col>

                                <Col span={8}>
                                    <Form.Item label="Category" name='category' rules={rules}>
                                        <select>
                                            <option value="">Select</option>
                                            <option value="electronics">Electronics</option>
                                            <option value="home">Home</option>
                                            <option value="fashion">Fashion</option>
                                        </select>
                                    </Form.Item>
                                </Col>

                                <Col span={8}>
                                    <Form.Item label="Age" name='age' rules={rules}>
                                        <Input type='number' />
                                    </Form.Item>
                                </Col>

                            </Row>

                            <div className="flex gap-10">

                                {additionalThings.map((item, index) => {
                                    return <Form.Item label={item.label} name={item.name} key={index}>
                                        <Input type='checkbox' value={item.name} onChange={(e) => {
                                            formRef.current.setFieldsValue({
                                                [item.name]: e.target.checked,
                                            });
                                        }}
                                            checked={formRef.current?.getFieldValue(item.name)}
                                        />
                                    </Form.Item>
                                })}

                            </div>
                        </Form>
                    </Tabs.TabPane>

                    {/**  <Tabs.TabPane tab="Images" key="2">
                    //     Images
                    </Tabs.TabPane>*/}


                </Tabs>
            </div>


        </Modal>
    )
}

export default ProductForm
