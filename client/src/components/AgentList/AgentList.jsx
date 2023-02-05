import React, { useState } from "react";
import "./AgentList.css";
import {
  EditFilled,
  DeleteOutlined,
  PhoneOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { MdOutlineLocationOn } from "react-icons/md";
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card, Skeleton, Switch } from 'antd';
const { Meta } = Card;
const AgentList = ({ agents, deleteAgent, handleEdit, showEditModal }) => {
  const [selectedID, setSelectedID] = useState();
  const [loading, setLoading] = useState(false);
  return (
    <div className="container">
      <Card className="biggCard"
    style={{
      width: 400,
    }}
    hoverable
    cover={<img alt="" src={agents[selectedID]?.photo || agents[0]?.photo || null }  />}
  >
    <Meta title={agents[selectedID]?.fname.toUpperCase() ||
            agents[0]?.fname.toUpperCase()} 
            description={
            <div className="carddsc"> 
              <p>{agents[selectedID]?.pnumber || agents[0]?.pnumber}</p>
              <p>{agents[selectedID]?.email || agents[0]?.email}</p>
              <p>{agents[selectedID]?.realestate || agents[0]?.realestate}</p>
            </div>}
            />
  </Card>
      <div style={{ flex: 1 }}>
        {agents?.map((agent, index) => {
          return (
            <Card 
             key={index} onClick={() => {
              setSelectedID(index);
            }}
            hoverable
        style={{
          width: 400,
          marginBottom: 16,
        }}
        actions={[
          <DeleteOutlined  onClick={() => deleteAgent(agent?.fname)} />,
          <EditOutlined           onClick={() => {
            handleEdit(agent);
            showEditModal();
          }} />,

        ]}
      >
        <Skeleton loading={loading} avatar active>
          <Meta
            avatar={<Avatar src={agent?.photo} />}
            title={agent?.fname}
            description={<div className="carddscc">
              <div>{agent?.pnumber}</div>
              <div>{agent?.email}</div>
              <div>{agent?.realestate}</div> 
            </div>}
          />
        </Skeleton>
      </Card>
          );
        })}
      </div>
    </div>
  );
};

export default AgentList;
