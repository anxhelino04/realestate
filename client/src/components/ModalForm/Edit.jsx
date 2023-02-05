import React from "react";
import { Modal } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const Edit = ({
  isEditModalVisible,
  agents,
  setAgents,
  agentOnEdit,
  setAgentOnEdit,
  cancelEdit,
  setIsEditModalVisible,
}) => {
  const onChangeName = (e) => {
    let copyObj = JSON.parse(JSON.stringify(agentOnEdit));
    setAgentOnEdit({ ...copyObj, fname: e.target.value });
  };
  const onChangeNumber = (e) => {
    let copyObj = JSON.parse(JSON.stringify(agentOnEdit));
    setAgentOnEdit({ ...copyObj, pnumber: e.target.value });
  };
  const onChangeEmail = (e) => {
    let copyObj = JSON.parse(JSON.stringify(agentOnEdit));
    setAgentOnEdit({ ...copyObj, email: e.target.value });
  };
  const onChangeRealestate = (e) => {
    let copyObj = JSON.parse(JSON.stringify(agentOnEdit));
    setAgentOnEdit({ ...copyObj, realestate: e.target.value });
  };
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onabort = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };
  const onChangePhoto = (e) => {
    let copyObj = JSON.parse(JSON.stringify(agentOnEdit));
    const file = e.target.files[0];
    getBase64(file).then((base64) => {
      setAgentOnEdit({ ...copyObj, photo: base64 });
    });
  };
  const cancelEditt = () => {
    setAgentOnEdit(null);
    cancelEdit();
  };

  const onSaveHandler = () => {
    let copyAgents = JSON.parse(JSON.stringify(agents));
    let foundAgentIndex = agents.findIndex(
      (agent) => agent.id === agentOnEdit.id
    );

    let finalData = copyAgents.splice(foundAgentIndex, 1, agentOnEdit);
    localStorage.setItem("agents", JSON.stringify(copyAgents));
    setIsEditModalVisible(false);
    setAgents(JSON.parse(localStorage.getItem("agents")));
  };

  return (
    <Modal open={isEditModalVisible} onCancel={cancelEditt}      footer={
      <button onClick={onSaveHandler} className="buttn">
        Save
      </button>
    }>
      <div className="modal-navbar">
        <h1 className="navbar-title">EDIT Agent</h1>
      </div>
      <div className="containerr">
        <div className="modal-forms">
          <label className="form-label">Full Name*</label>
          <br></br>
          <input
            required
            // defaultValue={agentOnEdit?.fname}
            value={agentOnEdit?.fname}
            placeholder="John Smith..."
            className="input-form"
            type="text"
            onChange={onChangeName}
          ></input>
        </div>
        <br></br>
        <div className="modal-forms">
          <label className="form-label">Number*</label>
          <br></br>
          <input
            required
            value={agentOnEdit?.pnumber}
            placeholder="+35569xxxxxxx"
            className="input-form"
            type="number"
            onChange={onChangeNumber}
          ></input>
        </div>
        <br></br>
        <div className="modal-forms">
          <label className="form-label">Email*</label>
          <br></br>
          <input
            value={agentOnEdit?.email}
            required
            placeholder="johnsmith@gmail.com"
            className="input-form"
            type="text"
            onChange={onChangeEmail}
          ></input>
        </div>
        <br></br>
        <div className="modal-forms">
          <label className="form-label">Realestate</label>
          <br></br>
          <input
            value={agentOnEdit?.realestate}
            placeholder="Tirana Realestate"
            className="input-form"
            type="text"
            onChange={onChangeRealestate}
          ></input>
        </div>
        <br></br>
        <div className="modal-forms">
          <label htmlFor="photoupload" className="upload">
            <div className="uploaddd">
            <UploadOutlined  />
            </div>
          </label>
          <h3 className="upload-text">Change Photo</h3>
          <input
            files={agentOnEdit?.photo}
            style={{ display: "none", visibility: "hidden" }}
            type="file"
            id="photoupload"
            onChange={onChangePhoto}
          ></input>
        </div>
      </div>
    </Modal>
  );
};

export default Edit;
