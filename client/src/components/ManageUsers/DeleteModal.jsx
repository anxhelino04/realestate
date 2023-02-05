import React from 'react';
import { Button, Modal } from 'antd';
import { useState } from 'react';
import axios from 'axios';
const DeleteModal = ({opendeletemodal,setOpendeletemodal,useerid}) => {
    const handleCancel = () => {
        setOpendeletemodal(false);
      };
      console.log(opendeletemodal,"ahsgdhafjhajhfgj")
      const DeleteUser = ()=>{
        axios.delete(`http://localhost:5000/api/users/delete/${useerid}`)
        .then(res => console.log(res))
        setOpendeletemodal(false)
        // .then(res => {Setallusers(res?.data) ;console.log(res?.data)}))
      }
    return (
        <div >
        <Modal className='deletemodal'
        open={opendeletemodal}
        onCancel={handleCancel} footer={[<Button onClick={DeleteUser} type="primary">Yes</Button>,<Button type="primary" danger>Cancel</Button>]}>
    <p style={{color:"white",textAlign:"center" ,height:"68px",marginTop:"10px"}}>Are you sure you want to delete this User?</p>
        </Modal>
        </div>
    );
};

export default DeleteModal;