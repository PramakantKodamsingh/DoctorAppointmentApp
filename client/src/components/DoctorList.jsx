import { Cursor } from "mongoose";
import React from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const DoctorList = ({ doctor }) => {
  const navigate = useNavigate();
  const startTime = moment(doctor.timings[0]).format("HH:mm");
  const endTime = moment(doctor.timings[1]).format("HH:mm");
  return (
    <>
      <div
        className="card m-2"
        style={{ cursor: "pointer" }}
        onClick={() => navigate(`/doctor/book-appointment/${doctor._id}`)}
      >
        <div className="card-header">
          Dr.{doctor.firstName} {doctor.lastName}
        </div>
        <div className="card-body">
          <b>Specialization :</b>
          {doctor.specialization}
        </div>
        <div className="card-body">
          <b>Experience :</b>
          {doctor.experience}
        </div>
        <div className="card-body">
          <b>Fees Per Cunsaltation :</b>
          {doctor.feesPerCunsaltation}
        </div>
        <div className="card-body">
          <b>Timings :</b>
          {startTime}-{endTime}
        </div>
      </div>
    </>
  );
};

export default DoctorList;
