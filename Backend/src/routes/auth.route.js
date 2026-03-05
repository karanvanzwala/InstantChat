import express from "express";

const router = express.Router()

router.get("/singup", (req, res) => {
    res.send("hello i am from serverside")
console.log("Singup")
})

router.get("/login", (req, res) => {
console.log("Login")
})

export default router;