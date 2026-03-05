import express from "express";

const router = express.Router()

router.get("/hello", (req, res) => {
    res.send("hello i am from message side")
console.log("Singup")
})

export default router;