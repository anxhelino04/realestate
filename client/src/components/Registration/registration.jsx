import React, { useState } from "react";
import { Form, Input, Select , Button } from "antd";
import axios from "axios";
import {useNavigate} from "react-router-dom"
import '../Registration/registration.css'
import {  notification } from 'antd';

const Registration = () => {
  const [error ,setError] = useState()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelect = (value) => {
    setFormData({ ...formData, role: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/users/register", formData)
      .then((response) => {
        console.log(response);
      navigate("/login")

      })
      .catch((error) => {
        if(error.response.data.msg == "User already exists"){
        notification.error({
          message: "Email is not avaliable",
          description: "Please, try using another email!",
          duration: 2
        });
      }else if(error.response.data == "Server Error")
      {notification.error({
        message: "Please fill the credentials",
        description: "You cannot create a user without credentials!",
        duration: 2
      });}
      });

  };

  return (
    <div >
      <div className="register">
      <h1 className="registerh1">Create an account</h1>
      <Form >
        <Form.Item label="Name">
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </Form.Item>
        <Form.Item label="Email">
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </Form.Item>
        <Form.Item label="Password">
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </Form.Item>
        <Form.Item style={{visibility:'hidden'}} label="Role">
          <Select 
            defaultValue={formData.role}
            onChange={handleSelect}
            style={{ width: "100%" }}
            required
          >
            <Select.Option value="user">User</Select.Option>
            <Select.Option value="admin">Admin</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
        <Button onClick={handleSubmit}  type="primary" htmlType="submit" className="registration-form-button">
          Submit
        </Button>
        </Form.Item>

      </Form>
      </div>
      <div className="registerr"> <p style={{
    marginTop: "-33px",
    fontSize: "20px",
}}>Already have an account?
<span className="loginhref" onClick={()=>{navigate('/login')}}>  Log in </span></p></div>
    </div>
  );
};
export default Registration;
