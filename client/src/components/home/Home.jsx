import React, { useState,useEffect } from "react";
import AgentList from "../AgentList/AgentList";
import AddButton from "../AddButton/AddButton";
import ModalForm from "../ModalForm/ModalForm";
import Edit from "../ModalForm/Edit";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  UserOutlined } from "@ant-design/icons";
import { Skeleton } from "antd";
const Home = () => {
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [agentOnEdit, setAgentOnEdit] = useState();
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const [foundAdmin,setfoundAdmin] = useState();
  useEffect(() => {
      axios
        .get("http://localhost:5000/api/users/get")
        .then(res => setfoundAdmin(res.data?.find(user => user?.email === localStorage.getItem("agentemail"))))
        .catch(err => console.error(err))
        // .then(setAgentemail( localStorage.getItem("agentemail")))
        // .then(setfoundAdmin(res.data?.find(user => user?.email === localStorage.getItem("agentemail"))))
    }, []);
  
  const showModal = () => {
    setIsModalOpen(true);
  };
  const showEditModal = () => {
    setIsEditModalVisible(true);
  };
  const deleteAgent = (fname) => {
    const filteredAgents = agents.filter((element, index) => {
      return element?.fname !== fname;
    });
    setAgents(filteredAgents);
    window.location.reload();
  };
  const cancelModal = () => {
    setIsModalOpen(false);
  };

  const cancelEdit = () => {
    setIsEditModalVisible(false);
  };

  const handleEdit = (agent) => {
    setAgentOnEdit(agent);
  };

  const getDatafromLs = () => {
    const data = localStorage.getItem("agents");
    if (data) {
      return JSON.parse(data);
    }
  };
  const [agents, setAgents] = useState(getDatafromLs() || []);
  const [loading, setLoading] = useState(false);
const ManageUsers = () => {
navigate('/manageusers')
}
  return (
    <div>
       {!loading && foundAdmin?.role === 'admin' ? <AddButton showModal={showModal} /> : null}
       <div style={{marginTop:"-31px"}}>
      {!loading && foundAdmin?.role === 'admin' ? <button onClick={ManageUsers} style={{padding:"9px",margin:"-10em 0px 0px 840px"}} className="addbutton"><UserOutlined />MANAGE USERS</button> : null}
      </div>
      {!loading ? (
        <AgentList
          agents={agents}
          deleteAgent={deleteAgent}
          handleEdit={handleEdit}
          showEditModal={showEditModal}
        />
      ) : (
        null
      )}
      <ModalForm
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        handleCancel={cancelModal}
        agents={agents}
        setAgents={setAgents}
        loading={loading}
        setLoading={setLoading}
      />
      <Edit
        isEditModalVisible={isEditModalVisible}
        agents={agents}
        setAgents={setAgents}
        cancelEdit={cancelEdit}
        agentOnEdit={agentOnEdit}
        setAgentOnEdit={setAgentOnEdit}
        setIsEditModalVisible={setIsEditModalVisible}
      />
    </div>
  );
};

export default Home;
