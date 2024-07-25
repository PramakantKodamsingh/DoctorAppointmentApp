import { message, Table } from "antd";
import Layout from "../../components/Layout";
import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  const getAppointments = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/v1/doctor/doctor-appointments",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setAppointments(res.data.data);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Failed to fetch appointments");
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  const handleStatus = async (record, status) => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/doctor/update-status",
        { appointmentsId: record._id, status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        getAppointments(); //To get the update value of appointments
      }
    } catch (error) {
      console.log(error);
      message.error(res.data.message);
    }
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => <span>{record.userInfo.name}</span>,
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (text, record) => <span>{record.userInfo.email}</span>,
    },

    {
      title: "Date & Time",
      dataIndex: "date",
      render: (text, record) => (
        <span>
          {moment(record.date).format("DD-MM-YYYY")}{" "}
          {moment(record.time).format("HH:mm")}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <div className="d-flex">
            {record.status === "pending" && (
              <div className="d-flex">
                <button
                  className="btn btn-success"
                  onClick={() => handleStatus(record, "approved")}
                  style={{ marginRight: "10px" }}
                >
                  Approve
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleStatus(record, "rejected")}
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <Layout>
      <h1 className="text-center">Appointment List</h1>
      <Table columns={columns} dataSource={appointments} rowKey="_id" />
    </Layout>
  );
};

export default DoctorAppointments;
