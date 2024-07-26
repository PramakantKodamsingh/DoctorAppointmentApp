import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/Layout";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { showLoading, hideLoading } from "../../redux/features/alertSlice";
import { Form, Col, Row, Input, TimePicker, message, Flex } from "antd";

const UserProfile = () => {
  const { user } = useSelector((state) => state.user);
  const [singleuser, setSingleuser] = useState(null);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFinish = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "http://localhost:8080/api/v1/users/updateUserInfo",
        {
          ...values, //we used ...values to add userId to the same object values otherwise it would create another object as userId
          userId: user._id,
          // timings: [
          //   moment(doctor.timings[0]).format("HH:mm"),
          //   moment(doctor.timings[1]).format("HH:mm"),
          // ],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        window.location.reload();
        message.success(res.data.message);
        navigate("/");
      } else {
        message.error(res.data.success);
      }
    } catch (error) {
      dispatch(hideLoading());
      // console.log(error);
      message.error("Something went wrong");
    }
  };

  const getUserInfo = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/users/getSingleUserInfo",
        { userId: params.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setSingleuser(res.data.data);
      }
    } catch (error) {
      // console.log(error);
    }
  };
  useEffect(() => {
    getUserInfo();
  }, []);
  return (
    <Layout>
      {singleuser && (
        <Form
          layout="vertical"
          onFinish={handleFinish}
          className="m-3"
          initialValues={singleuser}
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column", // Optional: to ensure children are stacked vertically
            backgroundColor: "#f7f7f7",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            justifyContent: "center",
            margin: "30px",
          }}
        >
          {/* Labels are displayed above the input fields. */}
          <h4
            style={{
              fontFamily: "Arial, sans-serif",
              fontWeight: "bold",
              color: "purple",
            }}
          >
            Personal Details
          </h4>
          <div style={{ display: "flex", justifyContent: "ceter" }}>
            <Form.Item
              label="Name"
              name="name"
              required
              rules={[{ required: true }]}
              style={{ marginRight: "30px" }}
            >
              <Input type="text" placeholder="your firstname" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Enter your phone no." />
            </Form.Item>
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <button className="btn btn-primary form-btn" type="submit">
              Update
            </button>
          </div>
        </Form>
      )}
    </Layout>
  );
};

export default UserProfile;
