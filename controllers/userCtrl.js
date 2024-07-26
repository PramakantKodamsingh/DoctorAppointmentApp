import userModel from "../models/UserModels.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import doctorModel from "../models/doctorModel.js";
import { appointmentModel } from "../models/appointmentModel.js";

//register callback
const registerController = async (req, res) => {
  try {
    const exisitingUser = await userModel.findOne({ email: req.body.email });
    if (exisitingUser) {
      return res
        .status(200)
        .send({ message: "User Already Exist", success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).send({ message: "Register Sucessfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Register Controller ${error.message}`,
    });
  }
};

// login callback
const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "user not found", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Invlid email or Password", success: false });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).send({ message: "Login Success", success: true, token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `Error in Login CTRL ${error.message}` });
  }
};

const authController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.userId }); //required ByID otherwise give something else like more than one item
    user.password = undefined;
    if (!user) {
      return res.status(200).send({
        message: "User not found",
        success: false,
      });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "auth error",
      success: false,
      error,
    });
  }
};

// Apply doctor controller
const applyDoctorController = async (req, res) => {
  try {
    const newDoctor = await doctorModel({ ...req.body, status: "pending" });
    await newDoctor.save();
    const adminUser = await userModel.findOne({ isAdmin: true });
    const notification = adminUser.notification;
    notification.push({
      //notification is an array in userModel
      type: "apply-doctor-request",
      message: `${newDoctor.firstName} ${newDoctor.lastName} Has Applied For A Doctor Account`,
      data: {
        doctorId: newDoctor._id,
        name: newDoctor.firstName + " " + newDoctor.lastName,
        onClickPath: "/admin/doctors",
      },
    });
    await userModel.findByIdAndUpdate(adminUser._id, { notification });
    res.status(201).send({
      success: true,
      message: "Doctor Account Applied SUccessfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While Applying For Doctotr",
    });
  }
};

const getAllNotificationController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    const seennotification = user.seennotification;
    const notification = user.notification;
    seennotification.push(...notification);
    user.notification = [];
    user.seennotification = seennotification;
    const updatedUser = await user.save();
    res.status(200).send({
      success: true,
      message: "All notifications marked as read",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error in notifiction",
      success: false,
      error,
    });
  }
};

//DELETE NOTIFICATIONS

const deleteAllNotificationController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    user.notification = [];
    user.seennotification = [];
    const updatedUser = await user.save();
    updatedUser.password = undefined;
    res.status(200).send({
      success: true,
      message: "Notification Deleted success fully",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Unable to delete all notification",
    });
  }
};

//getAlldoctors

const getAllDoctorsController = async (req, res) => {
  try {
    const doctors = await doctorModel.find({ status: "approved" });
    res.status(200).send({
      success: true,
      message: "Doctors List Fetched Successfully",
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While Fetching Doctor",
    });
  }
};

const bookAppointmentController = async (req, res) => {
  try {
    // req.body.date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    // req.body.date = moment(req.body.time, "HH:mm").toISOString();
    req.body.status = "pending";

    console.log("Received request body:", req.body); // Log request body

    const newAppointment = new appointmentModel(req.body);
    await newAppointment.save();

    const user = await userModel.findOne({ _id: req.body.doctorInfo.userId });
    if (user) {
      user.notification.push({
        type: "New appointment request",
        message: `A new Appointment Request from ${req.body.userInfo.name}`,
        onClickPath: "/user/appointments",
      });
      await user.save();
    } else {
      console.log("User not found:", req.body.doctorInfo.userId); // Log if user not found
    }

    res.status(200).send({
      success: true,
      message: "Appointment booked successfully",
    });
  } catch (error) {
    console.error("Error while booking appointment:", error); // Log detailed error
    res.status(500).send({
      success: false,
      message: "Error while booking appointment",
      error: error.message,
    });
  }
};

const bookingAvailabilityController = async (req, res) => {
  try {
    const date = req.body.date; // Assuming this is already in ISO format
    const time = req.body.time; // Assuming this is already in ISO format
    const doctorId = req.body.doctorId;

    // Define the time range for querying. Adjust these as needed.
    const fromTime = new Date(time);
    fromTime.setHours(fromTime.getHours() - 1); // 1 hour before
    const toTime = new Date(time);
    toTime.setHours(toTime.getHours() + 1); // 1 hour after

    const appointments = await appointmentModel.find({
      doctorId,
      date,
      time: {
        $gte: fromTime.toISOString(),
        $lte: toTime.toISOString(),
      },
    });

    if (appointments.length > 0) {
      return res.status(200).send({
        message: "Appointments not Available",
        success: false,
      });
    } else {
      return res.status(200).send({
        success: true,
        message: "Appointments Available",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error In Booking",
    });
  }
};

const userAppointmentsController = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({
      userId: req.body.userId,
    });
    res.status(200).send({
      success: true,
      message: "User Appointments Fetch Successfully",
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error In User Appointment",
    });
  }
};

const getSingleUserInfoController = async (req, res) => {
  try {
    const singleuser = await userModel.findOne({ _id: req.body.userId });
    res.status(200).send({
      success: true,
      message: "Single User data fetch success",
      data: singleuser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Fetching Single User Details",
      error,
    });
  }
};

const updateUserController = async (req, res) => {
  try {
    const singleUser = await userModel.findOneAndUpdate(
      { _id: req.body.userId },
      req.body
    );
    res.status(200).send({
      success: true,
      message: "User Profile Updated",
      data: singleUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "User Profile Update Issue",
      error,
    });
  }
};

export {
  loginController,
  registerController,
  authController,
  applyDoctorController,
  getAllNotificationController,
  deleteAllNotificationController,
  getAllDoctorsController,
  bookAppointmentController,
  bookingAvailabilityController,
  userAppointmentsController,
  getSingleUserInfoController,
  updateUserController,
};
