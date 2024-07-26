import axios from "axios";
import Layout from "../../components/Layout";
import React, { useEffect, useState } from "react";
import { message, Table } from "antd";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const getDoctors = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/v1/admin/getAllDoctors",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAccountStatus = async (record, status) => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/admin/changeAccountStatus",
        { doctorId: record._id, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        window.location.reload();
      }
    } catch (error) {
      message.error("Something went wrong!");
    }
  };

  useEffect(() => {
    getDoctors();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "firstName", // Using firstName as dataIndex here it is not needed
      render: (text, record) => `${record.firstName} ${record.lastName}`, // Combining firstName and lastName
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Specialization",
      dataIndex: "specialization",
    },
    {
      title: "Address",
      dataIndex: "address",
    },

    {
      title: "Action",
      dataIndex: "actions",
      render: (
        text,
        record //here text is the value of dataIndex and record is the value of the data object of the current row.
      ) => (
        <div className="d-flex">
          {record.status === "pending" ? (
            <button
              className="btn btn-success"
              onClick={() => handleAccountStatus(record, "approved")}
            >
              Approve
            </button>
          ) : (
            <button className="btn btn-danger">Reject</button>
          )}
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
        All Doctors
      </h4>
      <Table columns={columns} dataSource={doctors}></Table>
    </Layout>
  );
};

export default Doctors;
