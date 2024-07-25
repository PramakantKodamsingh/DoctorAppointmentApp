import React from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import '../styles/RegisterStyles.css';
import {Link,useNavigate} from "react-router-dom"
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { showLoading,hideLoading } from '../redux/features/alertSlice';


function Register() {
  const navigate=useNavigate()
  const dispatch=useDispatch()

  const onFinishHandler = async (values) => {
    console.log(values)
    try {
      dispatch(showLoading())
      const res = await axios.post("http://localhost:8080/api/v1/users/register", values);
      dispatch(hideLoading())
      if (res.data.success) {
        message.success("Register Successfully!");// it is well styled due to antdesign
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading())
      console.log(error);
      message.error("Something gone Wrong",);
    }
  };
  
  return (
    <>
    <div className="form-container">
    <Form layout='vertical' onFinish={onFinishHandler} className='register-form'>
      <h1>Sign in</h1>

    {/* <Form.Item
        label="Name"
        name="name"
        rules={[
          { required: true, message: 'Please input your name!' },
          { min: 3, message: 'Name must be at least 3 characters long!' }
        ]}
      >
        <Input />
      </Form.Item> */}

      <Form.Item label="Name" name="name">
        <Input type="text" required />
      </Form.Item>
      <Form.Item label="Email" name="email">
        <Input type="email" required />
      </Form.Item>
      <Form.Item label="Password" name="password">
        <Input type="password" required />
      </Form.Item>
      <Link to='/login' className='m-2'> Login if already member</Link>
      <button className="btn btn-primary" type="submit">Sign in</button>
      

    </Form>
    </div>
    </>
  )
}

export default Register
