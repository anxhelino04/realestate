import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import "./modal.css";
import { nanoid } from "nanoid";
import { UploadOutlined } from "@ant-design/icons";
const ModalForm = ({
  isModalOpen,
  handleCancel,
  setIsModalOpen,
  setAgents,
  agents,
  loading,
  setLoading,
}) => {
  const [fname, setFname] = useState("");
  const [pnumber, setPnumber] = useState();
  const [email, setEmail] = useState("");
  const [realestate, setRealestate] = useState("");
  const [photo, setPhoto] = useState(null);
  const [fnamemsg, setFnamemsg] = useState("");
  const [pnumbermsg, setPnumbermsg] = useState();
  const [emailmsg, setEmailmsg] = useState("");
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onabort = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };
  const HandleImage = (e) => {
    const file = e.target.files[0];
    getBase64(file).then((base64) => {
      setPhoto(base64);
    });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    let agent = {
      fname,
      pnumber,
      email,
      realestate,
      id: nanoid(6),
      photo: photo,
    };
   
      setAgents([...agents, agent]);
      setFname("");
      setEmail("");
      setPnumber();
      setRealestate("");
      setPhoto(null);
      setIsModalOpen(false);
      setLoading(true); 
  };

  setTimeout(() => {
    setLoading(false);
  }, 2100);
  useEffect(() => {
    localStorage.setItem("agents", JSON.stringify(agents));
  }, [agents]);
  console.log(loading, "testing loadinggg");

  return (
    <Modal
      open={isModalOpen}
      onCancel={handleCancel}
      footer={
        <button onClick={submitHandler} className="buttn">
          ADD
        </button>
      }
    >
      <div className="modal-navbar">
        <h1 className="navbar-title">ADD Agents</h1>
      </div>
      <div className="containerr">
        <div className="modal-forms">
          <label className="form-label">Full Name*</label>
          <br></br>
          <input
            required
            value={fname}
            placeholder="John Smith..."
            className="input-form"
            type="text"
            onChange={(e) => {setFname(e.target.value);
              if (fname?.length ==0) {
                setFnamemsg("*Full name must be more than one character");
              } else if (fname?.length >= 1) {
                setFnamemsg("");
              }}}
          ></input>
          <p className="msg">{fnamemsg}</p>
        </div>
        <div className="modal-forms">
          <label className="form-label">Number*</label>
          <br></br>
          <input
            required
            value={pnumber}
            placeholder="+35569xxxxxxx"
            className="input-form "
            type="number"
            onChange={(e) => {setPnumber(e.target.value);if (pnumber?.length < 1) {
              setPnumbermsg("*Number must be more than one character");
            } else if (pnumber?.length > 0) {
              setPnumbermsg("");
            }}}
          ></input>
          <p className="msg">{pnumbermsg}</p>
        </div>
        <div className="modal-forms">
          <label className="form-label">Email*</label>
          <br></br>
          <input
            value={email}
            required
            placeholder="johnsmith@gmail.com"
            className="input-form"
            type="email"
            onChange={(e) => {setEmail(e.target.value);   if (email?.length < 1) {
              setEmailmsg("*Email must be more than one character");
            } else if (email?.length) {
              setEmailmsg("");
            }}}
          ></input>
          <p className="msg">{emailmsg}</p>
        </div>
        <div className="modal-forms">
          <label className="form-label">Realestate</label>
          <br></br>
          <input
            value={realestate}
            placeholder="Tirana Realestate"
            className="input-form"
            type="text"
            onChange={(e) => setRealestate(e.target.value)}
          ></input>
        </div>
        <div className="upload">
          <label htmlFor="photoupload" className="upload-icon">
            <UploadOutlined />
          </label>
          <h3 className="upload-text">Upload Photo</h3>
          <input
            style={{ display: "none", visibility: "hidden" }}
            type="file"
            id="photoupload"
            onChange={HandleImage}
          ></input>
        </div>
      </div>
    </Modal>
  );
};

export default ModalForm;
