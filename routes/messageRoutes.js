import { Router } from "express";
import { addMessage, listChannelMessages } from "../controllers/messageController.js";

const router = Router();

router.post("/", addMessage);
router.get("/channel/:id", listChannelMessages);
export default router;
