import { Router } from "express";
import { addMessage, listChannelMessages } from "../controllers/messageController.js";

const router = Router();

router.post("/messages", addMessage);
router.get("/channels/:id/messages", listChannelMessages);

export default router;
