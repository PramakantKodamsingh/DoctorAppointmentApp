import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import Doctors from "./admin/Doctors";
import moment from "moment";
import { DatePicker, TimePicker, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import "../styles/BookingpageStyles.css";

const BookingPage = () => {
  const { user } = useSelector((state) => state.user);
  const [doctor, setDoctor] = useState([]);
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [isAvailable, setIsAvailable] = useState(false);
  const dispatch = useDispatch();
  const params = useParams();
  const getUserData = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/doctor/getDoctorById",
        { doctorId: params.doctorId },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setDoctor(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Getting time from ISO format
  let startTime = null; // it is outside because to accessible outside the if block so that we could get in the jsx below
  let endTime = null;
  if (doctor.timings && doctor.timings.length >= 2) {
    startTime = moment(doctor.timings[0]).format("HH:mm");
    endTime = moment(doctor.timings[1]).format("HH:mm");
  }

  // ======= Booking Function

  const handleBooking = async () => {
    try {
      setIsAvailable(true);
      if (!date && !time) {
        return alert("Date & Time Required");
      }
      dispatch(showLoading());
      const res = await axios.post(
        "http://localhost:8080/api/v1/users/book-appointment",
        {
          doctorId: params.doctorId,
          userId: user._id,
          userInfo: user,
          date: date,
          time: time,
          doctorInfo: doctor,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      console.log(time);
      if (res.data.success) {
        message.success(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error("Error while booking appointment");
      console.log(error);
    }
  };

  //=======check Availability
  const handleAvailability = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "http://localhost:8080/api/v1/users/booking-availability",
        { doctorId: params.doctorId, date, time },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        setIsAvailable(true);

        message.success(res.data.message);
      } else {
        setIsAvailable(false);
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      setIsAvailable(false);
      console.log(error);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Layout>
      <h3
        className="booking-page"
        style={{
          fontFamily: "Arial, sans-serif",
          fontWeight: "bold",
          color: "purple",
        }}
      >
        Booking Page
      </h3>
      <div className="container booking-page">
        {doctor && (
          <div>
            <h4
              style={{
                fontFamily: "cursive",
                fontWeight: "bold",
                textShadow: "1px 1px 1px #0000FF",
              }}
            >
              Dr. {doctor.firstName} {doctor.lastName}
            </h4>
            <h4
              style={{
                fontFamily: "serif",
                fontWeight: "bold",
              }}
            >
              Fees: {doctor.feesPerCunsaltation}
            </h4>
            <h4
              style={{
                fontFamily: "serif",
                fontWeight: "bold",
              }}
            >
              Timings: {startTime} - {endTime}
            </h4>
            <div className="d-flex">
              <DatePicker
                format="DD-MM-YYYY"
                onChange={(value) => setDate(value)}
                style={{ margin: "5px" }}
              />
              <TimePicker format="HH:mm" onChange={(value) => setTime(value)} />
              <button className="btn btn-primary" onClick={handleAvailability}>
                Check Availability
              </button>
              <button className="btn btn-success" onClick={handleBooking}>
                Book Now
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BookingPage;
