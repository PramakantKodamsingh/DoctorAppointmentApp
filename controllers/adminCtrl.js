import doctorModels from "../models/doctorModel.js";
import userModel from "../models/UserModels.js";
import UserModels from "../models/UserModels.js";

const getAllUsersController = async (req, res) => {
  try {
    const users = await UserModels.find({});
    res.status(200).send({
      success: true,
      message: "User Data List",
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in finding Users",
      error,
    });
  }
};

const getAllDoctorController = async (req, res) => {
  try {
    const doctors = await doctorModels.find({});
    res.status(200).send({
      success: true,
      message: "Doctors Data List",
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in finding Doctors",
      error,
    });
  }
};

const changeAccountStatusController = async (req, res) => {
  try {
    const { doctorId, status } = req.body;
    const doctor = await doctorModels.findByIdAndUpdate(doctorId, { status });
    const user = await UserModels.findOne({ _id: doctor.userId });
    const notification = user.notification;
    notification.push({
      type: "doctor-account-request-updated",
      message: `Your Doctor Account Request Has ${status}`,
      onClickPath: "/notification",
    });
    user.isDoctor = status === "approved" ? true : false;
    await user.save();
    res.status(201).send({
      success: true,
      message: "Account Status Updated",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    req.status(500).send({
      success: false,
      message: "Error in Account Status",
      error,
    });
  }
};

//========single admin info

const getAdminInfoController = async (req, res) => {
  try {
    const admin = await userModel.findOne({ _id: req.body.userId });
    res.status(200).send({
      success: true,
      message: "Admin data fetch success",
      data: admin,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Fetching Admin Details",
      error,
    });
  }
};

const updateAdminController = async (req, res) => {
  try {
    const newadmin = await userModel.findOneAndUpdate(
      { _id: req.body.userId },
      req.body
    );
    res.status(200).send({
      success: true,
      message: "Admin Profile Updated",
      data: newadmin,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Admin Profile Update Issue",
      error,
    });
  }
};

export {
  getAllDoctorController,
  getAllUsersController,
  changeAccountStatusController,
  getAdminInfoController,
  updateAdminController,
};
