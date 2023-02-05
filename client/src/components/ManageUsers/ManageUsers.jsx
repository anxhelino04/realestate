import React from 'react';
import { useEffect,useState } from 'react';
import axios from 'axios';
import { Button, Space, Table, Tag } from 'antd';
import EditUserModal from '../EditUserModal/EditUserModal';
import DeleteModal from './DeleteModal';
const ManageUsers = () => {
    const [allusers,Setallusers] = useState([])
    const [userID,setUserID] = useState()
    const [open, setOpen] = useState(false);
    const[useerid,setUseerid] = useState();
const[opendeletemodal,setOpendeletemodal] = useState(false)
    useEffect(() => {
        !open  && axios
          .get("http://localhost:5000/api/users/get")
          .then(res => {Setallusers(res?.data) ;console.log(res?.data)})
          .catch(err => console.error(err));
      }, [open,opendeletemodal]);
      let data = allusers ? allusers?.map(user => ({
        ...user,
        key: user?.id
    })):[];
    const EditUser = (record) => {
        console.log(record._id)
        setUserID(record._id)
        setOpen(true);
        
    }
    const onClickDelete = (record) => {
        console.log(record._id);
        setOpendeletemodal(true)
        setUseerid(record._id)
        
    }
    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 1,
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key:2
        },
        {
          title: 'Role',
          dataIndex: 'role',
          key:3
        },

        {
          title: 'Action',
          key:4,
          render: (_, record) => (
            <Space size="middle">
              <Button onClick={() => EditUser(record) } type="primary">Edit </Button>
              <Button onClick={() => onClickDelete(record) } type="primary" danger>Delete</Button>
            </Space>
          ),
        },
      ];
      


    return (
        <div>
            <Table style={{marginTop:"7em"}} columns={columns} dataSource={data} />
            <EditUserModal userID={userID} open={open} setOpen={setOpen}/>
            <DeleteModal useerid={useerid} setOpendeletemodal={setOpendeletemodal} opendeletemodal={opendeletemodal} />
        </div>
    );
};

export default ManageUsers;