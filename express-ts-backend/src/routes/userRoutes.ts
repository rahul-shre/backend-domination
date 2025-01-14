import express from "express";
import { createUser } from "../controllers/userController";
import { validate } from "../middleware/validate";
import { userSchema } from "../validation/userValidation";

const router = express.Router();

router.post("/", validate(userSchema), createUser);

export default router;
