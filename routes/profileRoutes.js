import express from "express";
import { protect } from "../middlewares/authMidlleware.js";

import {
  getCurrentProfile,
  createUpdateUserProfile,
  getAllProfiles,
  getProfile,
  deleteUserProfile,
  addExperienceToProfile,
  deleteExpereiceFromProfile,
  addEducationToProfile,
  deleteEducationFromProfile,
  getUserRepo,
} from "../controllers/profileController.js";

const router = express.Router();

router.route("/me").get(protect, getCurrentProfile);
router.route("/:id").get(getProfile);
router
  .route("/")
  .post(protect, createUpdateUserProfile)
  .get(getAllProfiles)
  .delete(protect, deleteUserProfile);

router.route("/experience").put(protect, addExperienceToProfile);
router.route("/experience/:exp_id").delete(protect, deleteExpereiceFromProfile);

router.route("/education").put(protect, addEducationToProfile);
router.route("/education/:edu_id").delete(protect, deleteEducationFromProfile);

router.route("/github/:username").get(getUserRepo);

export default router;
