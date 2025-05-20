import { Router } from "express";
import { subscribeToChannel } from "../controllers/subscriptionController.js";

const router = Router();
router.post("/", subscribeToChannel);
export default router;
