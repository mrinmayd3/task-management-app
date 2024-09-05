import { Router } from "express";
import {
  createATask,
  deleteTask,
  getAllTasks,
  getTask,
  updateTask,
} from "../controllers/task.js";
import { isAuthorized } from "../middlewares/auth.js";

const router = Router();

router.use(isAuthorized);

router.route("/").get(getAllTasks).post(createATask);

router.route("/:id").get(getTask).put(updateTask).delete(deleteTask);

export default router;
