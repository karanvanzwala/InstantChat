import express from "express";
import { signup, login, logout, updateProfile } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";

const router = express.Router()

// router.use(arcjetProtection);


router.post("/singup", signup)


// router.get("/test", (req, res) => {
//     console.log("666776")
//     res.send("hello i am from message side")

// })

router.post("/login", login)
router.post("/logout", logout)
router.post("/update-profile", protectRoute, updateProfile)

export default router;