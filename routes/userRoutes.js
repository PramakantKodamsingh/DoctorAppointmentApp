import { Router } from "express";
import {
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
} from "../controllers/userCtrl.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

//routes
// LOGIN || POST
router.route("/login").post(loginController); //these routes provide req.body

//REGISTER || POST
router.post("/register", registerController);

router.route("/getUserData").post(authMiddleware, authController); //after next() in authMiddler authController will run

router.route("/apply-doctor").post(authMiddleware, applyDoctorController); //after next() in authMiddler authController will run

router
  .route("/get-all-notification")
  .post(authMiddleware, getAllNotificationController); //after next() in authMiddler authController will run

router
  .route("/delete-all-notification")
  .post(authMiddleware, deleteAllNotificationController);

//get all doc
router.route("/getAllDoctors").get(authMiddleware, getAllDoctorsController);

router
  .route("/book-appointment")
  .post(authMiddleware, bookAppointmentController);

router
  .route("/booking-availability")
  .post(authMiddleware, bookingAvailabilityController);

router
  .route("/user-appointments")
  .get(authMiddleware, userAppointmentsController);

router
  .route("/getSingleUserInfo")
  .post(authMiddleware, getSingleUserInfoController);

router.route("/updateUserInfo").post(authMiddleware, updateUserController);

export default router;
