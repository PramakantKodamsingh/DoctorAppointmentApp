import { Router } from "express";
import {
  getAllUsersController,
  getAllDoctorController,
  changeAccountStatusController,
  getAdminInfoController,
  updateAdminController,
} from "../controllers/adminCtrl.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.route("/getAllDoctors").get(authMiddleware, getAllDoctorController); //after next() in authMiddler authController will run

router.route("/getAllUsers").get(authMiddleware, getAllUsersController);
router
  .route("/changeAccountStatus")
  .post(authMiddleware, changeAccountStatusController);

router.route("/getAdminInfo").post(authMiddleware, getAdminInfoController);

router.route("/updateAdminInfo").post(authMiddleware, updateAdminController);
export default router;
