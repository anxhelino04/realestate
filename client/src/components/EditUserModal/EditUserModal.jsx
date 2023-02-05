import React, { useEffect } from 'react';
import { Button, Modal } from 'antd';
import { useState } from 'react';
import { Select } from 'antd';
import axios from 'axios';
const EditUserModal = ({userID,open,setOpen}) => {
    
      const onSearch = (value) => {
        console.log('search:', value);
      };
    const[useer,setUseer] = useState()
useEffect(() => {
    
    open && axios
      .get(`http://localhost:5000/api/users/${userID}`)
      .then(res => {setUseer(res.data)})
      .catch(err => console.error(err)) 
  }, [open])  
  const handleCancel = (e) => {
    console.log(e);
    setOpen(false);
  };
  const onChangeName = (e) => {
    let copyObj = JSON.parse(JSON.stringify(useer));
    setUseer({...copyObj ,name:e.target.value})
  }
  const onChangeEmail = (e) => {
    let copyObj = JSON.parse(JSON.stringify(useer));
    setUseer({...copyObj ,email:e.target.value})
  }
  const onChange = (e) => {
    console.log(e)
    let copyObj = JSON.parse(JSON.stringify(useer));
    setUseer({...copyObj ,role:e})    
  }; 
  const EditUser = () => {
    axios.put(`http://localhost:5000/api/users/${userID}`,useer)
    .then(res=>{console.log(res.data);setUseer(res.data);setOpen(false)})
  }
    return (
        <Modal
          open={open}
          onCancel={handleCancel}
          footer={<button onClick={EditUser}  className='buttn'>Edit</button>}
        >
          <div className="modal-navbar">
        <h1 className="navbar-title">EDIT USER</h1>
      </div>
      <div className="containerr">
        <div className="modal-forms">
          <label className="form-label">Name</label>
          <br></br>
          <input
            required
            value={useer?.name}
            className="input-form"
            type="text"
            onChange={onChangeName}
          ></input>
        </div>
        <br></br>
        <div className="modal-forms">
          <label className="form-label">Email</label>
          <br></br>
          <input
            required
            value={useer?.email}
            className="input-form"
            type="text"
            onChange={onChangeEmail}
          ></input>
        </div>
        <br></br>
        <div>
        <label style={{marginLeft:"8.4em"}} className="form-label">Role:</label><br></br>

        <Select className='roleedit'
    // showSearch
    optionFilterProp="children"
    onChange={onChange}
    onSearch={onSearch}
    value={useer?.role}
    filterOption={(input, option) =>
      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
    }
    options={[
      {
        value: 'user',
        label: 'user',
      },
      {
        value: 'admin',
        label: 'admin',
      },

    ]}
  >
  </Select>
        </div>
        </div><br></br>
        </Modal>
    );
};

export default EditUserModal;