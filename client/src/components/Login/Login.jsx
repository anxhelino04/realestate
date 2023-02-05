import React, { useState } from "react";
import axios from "axios";
import { setGlobalState,useGlobalState } from "../state";
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useEffect } from "react";
import background from '../pics/back-ground.jpg'
import {useNavigate} from "react-router-dom"
import {  notification } from 'antd';

import '../Login/Login.css'
function Login() {
  const navigate = useNavigate()
  const data = useGlobalState("credentials")
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const [userOnEdit,setUserOnEdit] = useState()
//  useEffect(()=>{
//   setUserOnEdit(data)},[])
console.log(userOnEdit,"useronedit")
const onChangeEmail = (e) => {
  // let copyObj = JSON.parse(JSON.stringify(userOnEdit));
  // setUserOnEdit({...copyObj,})
  setEmail(e.target.value)
}
const onChangePassword = (e) => {
setPassword(e.target.value)
}
const Register = () => {
navigate('/register')
}
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password,
      });
      // console.log(JSON.parse(res.config.data).email,"ressssssssssss")
      localStorage.setItem("jwt", res.data.token);
      localStorage.setItem("agentemail", JSON.parse(res.config.data).email);
      navigate("/home");
      window.location.reload();

    } catch (err) {
      notification.error({
        message: "Invalid User",
        description: "Credentials you have entered may not be correct !",
        duration: 2
      });
    }
   
  };

  return (
    <div style={{display:"flex" , marginTop:"8.5em",gap:"8em"}}>

      <img className="background" width="500" height="350" src={background}></img>
      <div className="line"></div>

      <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      // onFinish={onFinish}
    >
      <Form.Item
        name="email"
        type="email"
        value={ email}
          onChange={onChangeEmail}
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        value={password}
          onChange={onChangePassword}
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item>
        <Button onClick={handleSubmit} type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        <p className="small-description">Don't have an account?</p>
        <Button onClick={Register} style={{backgroundColor: "grey"}} type="primary" htmlType="submit" className="login-form-button">
          Sign Up
        </Button>
       
      </Form.Item>
    </Form>
    </div>
  );
}

export default Login;
