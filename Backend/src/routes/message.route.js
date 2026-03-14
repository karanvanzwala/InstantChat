import express from "express";
import { getAllContacts } from "../controllers/message.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router()


router.get("/contacts", protectRoute, getAllContacts)
// router.ger("/chats", getChatPartners)
// router.ger("/:id", getMessagesByUserId)

// router.post("/send:id", sendMessage)

export default router;