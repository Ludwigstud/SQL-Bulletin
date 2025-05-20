import { Router } from "express";
import { addUser, listUserChannels } from "../controllers/userController.js";

const router = Router();

router.post("/", addUser);
router.get("/:id/channels", listUserChannels);
export default router;
