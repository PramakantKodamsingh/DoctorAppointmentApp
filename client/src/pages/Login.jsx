import React from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import "../styles/LoginStyles.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "http://localhost:8080/api/v1/users/login",
        values
      );
      window.location.reload(); //used to reload the located page
      dispatch(hideLoading());
      if (res.data.success) {
        localStorage.setItem("token", res.data.token); //we can store for more secure in HTTP-Only Cookies for Storing JWTs:
        message.success("Login Successfuly");
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong");
    }
  };

  return (
    <>
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <h1 className="animated-text">Welcome To DOC APP</h1>
      </div>

      <div className="form-container">
        <Form
          layout="vertical"
          onFinish={onFinishHandler}
          className="register-form"
        >
          <h1>Login</h1>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input type="email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input type="password" />
          </Form.Item>
          <Link to="/register" className="m-2">
            {" "}
            Sign in if not a member{" "}
          </Link>
          <button className="btn btn-primary" type="submit">
            Login
          </button>
        </Form>
      </div>
    </>
  );
}

export default Login;
