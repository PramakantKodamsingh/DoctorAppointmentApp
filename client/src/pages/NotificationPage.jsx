import { message, Tabs } from "antd";
import Layout from "../components/Layout";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import { Cursor } from "mongoose";
import axios from "axios";

const NotificationPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const handleMarkAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "http://localhost:8080/api/v1/users/get-all-notification",
        { userId: user._id },
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
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      // console.log(error);
      message.error("Can't mark read");
    }
  };

  const handleDeleteAllRead = async (req, res) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "http://localhost:8080/api/v1/users/delete-all-notification",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        //res.data will be the object inside res.status not only the data key value
        window.location.reload();
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      // console.log(error);
      message.error("Can't delete notifications");
    }
  };

  const tabs = [
    {
      key: "0",
      label: "Read",
      children: (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              padding: "10px",
            }}
          >
            <h4
              className="p-2 text-primary"
              style={{ cursor: "pointer" }}
              onClick={handleMarkAllRead}
            >
              <button className="btn btn-primary">Mark All Read</button>
            </h4>
          </div>
          {user?.notification?.map(
            (
              notificationMsg,
              index //implicitly returning without using return
            ) => (
              <div
                className="card"
                key={index}
                onClick={() =>
                  (window.location.href = notificationMsg.onClickPath)
                }
                style={{ Cursor: "pointer", margin: "10px" }}
              >
                <div
                  className="card-text"
                  style={{
                    margin: "10px",
                    fontFamily: "cursive",
                    fontWeight: "bold",
                    display: "flex",
                  }}
                >
                  {notificationMsg.message}
                </div>
              </div>
            )
          )}
        </div>
      ),
    },
    {
      key: "1",
      label: "Unread",
      children: (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              padding: "10px",
            }}
          >
            <h4
              className="p-2 text-primary"
              style={{ cursor: "pointer" }}
              onClick={handleDeleteAllRead}
            >
              <button className="btn btn-danger">Delete All Read</button>
            </h4>
          </div>
          {user?.seennotification?.map(
            (
              notificationMsg,
              index //implicitly returning without using return
            ) => (
              <div
                className="card"
                key={index}
                onClick={() =>
                  (window.location.href = notificationMsg.onClickPath)
                }
                style={{ Cursor: "pointer", margin: "10px" }}
              >
                <div
                  className="card-text"
                  style={{
                    margin: "10px",
                    fontFamily: "cursive",
                    fontWeight: "bold",
                    display: "flex",
                  }}
                >
                  {notificationMsg.message}
                </div>
              </div>
            )
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
        Notification Page
      </h4>
      <Tabs defaultActiveKey="0" items={tabs} />
    </Layout>
  );
};

export default NotificationPage;
