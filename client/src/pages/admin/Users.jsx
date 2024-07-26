import axios from "axios";
import Layout from "../../components/Layout";

import React, { useEffect, useState } from "react";
import { Table } from "antd";

const Users = () => {
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/v1/admin/getAllUsers",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setUsers(res.data.data);
      }
    } catch (error) {
      // console.log(error);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Doctor",
      dataIndex: "isDoctor",
      render: (text, record) => <span>{record.isDoctor ? "Yes" : "No"}</span>,
    },
    {
      title: "Action",
      dataIndex: "actions",
      render: (
        text,
        record //here text is the value of dataIndex and record is the value of the data object of the current row.
      ) => (
        <div className="d-flex">
          <button className="btn btn-danger">Block</button>
        </div>
      ),
    },
  ];
  return (
    <Layout>
      <h4
        className="p-3 text-center"
        style={{
          fontFamily: "Arial, sans-serif",
          fontWeight: "bold",
          color: "purple",
        }}
      >
        All Users
      </h4>
      <Table columns={columns} dataSource={users} rowKey="_id" />
    </Layout>
  );
};

export default Users;
