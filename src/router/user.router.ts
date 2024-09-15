import { Router } from "express";
import {
  addUsersService,
  deleteUserService,
  getUserService,
  updateUserService,
} from "../services/user.services";
import { createControllerFromServices } from "../util/misc.util";

const router = Router();

router.get(
  "/:userId",
  createControllerFromServices(getUserService, "Unable to get user"),
);
router.post(
  "/",
  createControllerFromServices(addUsersService, "Unable to add users"),
);
router.patch(
  "/:userId",
  createControllerFromServices(updateUserService, "unable to update user"),
);
router.delete(
  "/:userId",
  createControllerFromServices(deleteUserService, "unable to delete user"),
);

export default router;
