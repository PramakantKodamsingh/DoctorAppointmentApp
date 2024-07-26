import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { Row } from "antd";
import DoctorList from "../components/DoctorList";

function HomePage() {
  const [doctors, setDoctors] = useState([]);
  const getUserData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/v1/users/getAllDoctors",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      // console.log(error);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <Layout>
      <section id="choosedoctor" style={{ height: "100vh" }}>
        <h1
          className="text-center"
          style={{
            fontFamily: "Arial, sans-serif",
            fontWeight: "bold",
            textShadow: "1px 1px 2px #673ab7 ",
          }}
        >
          Choose Your Doctor{" "}
        </h1>
        <Row>
          {doctors &&
            doctors.map((doctor) => {
              return <DoctorList doctor={doctor} key={doctor._id} />;
            })}
        </Row>
      </section>
    </Layout>
  );
}

export default HomePage;
