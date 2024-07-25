import { Router } from "express";

import {
  doctorAppointmentsController,
  getDoctorByIdController,
  getDoctorInfoController,
  updateProfileController,
  updateStatusController,
} from "../controllers/doctorCtrl.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.route("/getDoctorInfo").post(authMiddleware, getDoctorInfoController); //after next() in authMiddler authController will run
router.route("/updateProfile").post(authMiddleware, updateProfileController); //after next() in authMiddler authController will run
router.post("/getDoctorById", authMiddleware, getDoctorByIdController);
router.get(
  "/doctor-appointments",
  authMiddleware,
  doctorAppointmentsController
);
router.post("/update-status", authMiddleware, updateStatusController);
export default router;
