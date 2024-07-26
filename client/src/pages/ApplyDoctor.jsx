import { Form, Col, Row, Input, TimePicker, message } from "antd";
import Layout from "../components/Layout";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import axios from "axios";
import moment from "moment";

function ApplyDoctor() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFinish = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "http://localhost:8080/api/v1/users/apply-doctor",
        {
          ...values, //we used ...values to add userId to the same object values otherwise it would create another object as userId
          userId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
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
  return (
    <Layout>
      <h3
        className="p-3 text-center"
        style={{
          fontFamily: "Arial, sans-serif",
          fontWeight: "bold",
          color: "purple",
        }}
      >
        Apply your doctor
      </h3>

      <Form layout="vertical" onFinish={handleFinish} className="m-3">
        {/* Labels are displayed above the input fields. */}
        <h5
          style={{
            fontFamily: "Arial, sans-serif",
            fontWeight: "bold",
          }}
        >
          Personal Details
        </h5>
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="First Name"
              name="firstName"
              required
              rules={[{ required: true }]}
            >
              <Input
                type="text"
                placeholder="your firstname"
                style={{ height: "40px" }}
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Last Name"
              name="lastName"
              required
              rules={[{ required: true }]}
            >
              <Input
                type="text"
                placeholder="your lastname"
                style={{ height: "40px" }}
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Phone no."
              name="phone"
              required
              rules={[{ required: true }]}
            >
              <Input
                type="text"
                placeholder="Enter your phone no."
                style={{ height: "40px" }}
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Email"
              name="email"
              required
              rules={[{ required: true }]}
            >
              <Input
                type="text"
                placeholder="your email"
                style={{ height: "40px" }}
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Website"
              name="website"
              //   required
              //   rules={[{ required: true }]}
            >
              <Input
                type="text"
                placeholder="your name"
                style={{ height: "40px" }}
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Address"
              name="address"
              required
              rules={[{ required: true }]}
            >
              <Input
                type="text"
                placeholder="your address"
                style={{ height: "40px" }}
              />
            </Form.Item>
          </Col>
        </Row>

        {/* professional data */}

        <h5
          style={{
            fontFamily: "Arial, sans-serif",
            fontWeight: "bold",
          }}
        >
          Professional Data
        </h5>
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Specialization"
              name="specialization"
              required
              rules={[{ required: true }]}
            >
              <Input
                type="text"
                placeholder="your specialization"
                style={{ height: "40px" }}
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Experience"
              name="experience"
              required
              rules={[{ required: true }]}
            >
              <Input
                type="text"
                placeholder="your experience"
                style={{ height: "40px" }}
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Feels per cunsaltation"
              name="feesPerCunsaltation"
              required
              rules={[{ required: true }]}
            >
              <Input
                type="text"
                placeholder="fees per cunsaltation"
                style={{ height: "40px" }}
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Timings"
              name="timings"
              // required
              // rules={[{ required: true }]}
            >
              <TimePicker.RangePicker format="HH:mm" />
            </Form.Item>
          </Col>

          <Col xs={24} md={24} lg={8}></Col>
          <Col xs={24} md={24} lg={8}>
            <button className="btn btn-primary form-btn" type="submit">
              Submit
            </button>
          </Col>
        </Row>
      </Form>
    </Layout>
  );
}

export default ApplyDoctor;
