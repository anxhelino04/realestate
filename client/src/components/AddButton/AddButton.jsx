import React from "react";
import "./addbutton.css";
import {
  UserAddOutlined } from "@ant-design/icons";
const AddButton = ({ showModal }) => {
  return (
    <div>
      <button onClick={showModal} className="addbutton">
      <UserAddOutlined />        ADD AGENT
      </button>
    </div>
  );
};

export default AddButton;
