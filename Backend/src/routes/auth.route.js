import express from "express";
import { signup } from "../controllers/auth.controller.js";

const router = express.Router()

router.post("/singup", signup)

router.get("/login", (req, res) => {
console.log("Login")
})

export default router;