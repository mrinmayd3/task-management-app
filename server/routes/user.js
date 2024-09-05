import { Router } from "express";
import { currentUser, logInUser, registerUser } from "../controllers/user.js";
import { isAuthorized } from "../middlewares/auth.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", logInUser);
router.get("/current", isAuthorized, currentUser);

export default router;
