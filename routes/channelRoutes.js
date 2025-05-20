import { Router } from "express";
import { addChannel } from "../controllers/channelController.js";

const router = Router();

router.post("/", addChannel);

export default router;
